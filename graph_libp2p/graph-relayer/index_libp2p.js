import { execute } from './.graphclient/index.js'
import { createLibp2p } from 'libp2p'
import { TCP } from '@libp2p/tcp'
import { Mplex } from '@libp2p/mplex'
import { Noise } from '@chainsafe/libp2p-noise'
import { FloodSub } from '@libp2p/floodsub'
import { fromString as uint8ArrayFromString } from 'uint8arrays/from-string'
import { toString as uint8ArrayToString } from 'uint8arrays/to-string'

let response

async function main() {
  response = await execute(
    /* GraphQL */ `
      query ExampleQuery @live {
        arbos(first: 5) {
          id
          owner
        }
      }
    `,
    {},
  )
  // console.log(response) // 1,2,3,4,5
  ;(async function () {
    let i = 0
    const topic = 'news'

    const [node1, node2] = await Promise.all([createNode(), createNode()])
    // console.log('node 2 - ', node2.peerId, node2.getMultiaddrs())
    // Add node's 2 data to the PeerStore
    await node1.peerStore.addressBook.set(node2.peerId, node2.getMultiaddrs())
    await node1.dial(node2.peerId)

    node1.pubsub.subscribe(topic)
    node1.pubsub.addEventListener('message', (evt) => {
      console.log(`node1 received: ${uint8ArrayToString(evt.detail.data)} on topic ${evt.detail.topic}`)
    })

    // Will not receive own published messages by default
    node2.pubsub.subscribe(topic)
    node2.pubsub.addEventListener('message', (evt) => {
      console.log(`node2 received: ${uint8ArrayToString(evt.detail.data)} on topic ${evt.detail.topic}`)
    })

    for await (const trade of response) {
      console.log(JSON.stringify(trade), i)
      i++
      node2.pubsub.publish(topic, uint8ArrayFromString('Plant Watered')).catch((err) => {
        console.error(err)
      })
      if (i >= 10) {
        console.log('ALL DONE!')
        break // triggers clearInterval above
      }
    }
  })()
}

const createNode = async () => {
  const node = await createLibp2p({
    addresses: {
      listen: ['/ip4/0.0.0.0/tcp/0'],
    },
    transports: [new TCP()],
    streamMuxers: [new Mplex()],
    connectionEncryption: [new Noise()],
    pubsub: new FloodSub(),
  })

  await node.start()
  return node
}

main().catch((e) => console.error(`Failed to run example:`, e))
