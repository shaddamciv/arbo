// import { createLibp2p } from 'libp2p'
// import { TCP } from '@libp2p/tcp'
// import { Mplex } from '@libp2p/mplex'
// import { Noise } from '@chainsafe/libp2p-noise'
// import { FloodSub } from '@libp2p/floodsub'
// import { fromString as uint8ArrayFromString } from 'uint8arrays/from-string'
// import { toString as uint8ArrayToString } from 'uint8arrays/to-string'
import { execute } from '../.graphclient'


let response:any;
async function main() {
   response = await execute(
    /* GraphQL */ `
    query @live {
      transactions(first: 2, orderBy: timestamp, orderDirection: desc) {
        id
        blockNumber
        timestamp
      }
    }
    `,
    {},
  );
  console.log(response); // 1,2,3,4,5
  (async function() {
  //   const topic = 'news'

  //   const [node2] = await Promise.all([
  //     createNode()
  //   ])

  //    // Add node's 2 data to the PeerStore
  // // await node1.peerStore.addressBook.set(node2.peerId, node2.getMultiaddrs())
  // // await node1.dial(node2.peerId)

  // // Will not receive own published messages by default
  // node2.pubsub.subscribe(topic)
  // node2.pubsub.addEventListener('message', (evt) => {
  //   console.log(`node2 received: ${uint8ArrayToString(evt.detail.data)} on topic ${evt.detail.topic}`)
  // })


    let i = 0;
    for await (const trade of response) {
      console.log(JSON.stringify(trade.data.transactions));
      i++;
      if (i >= 10) {
        console.log("ALL DONE!");
        break; // triggers clearInterval above
      }
    }
  })();
}



// const createNode = async () => {
//   const node = await createLibp2p({
//     addresses: {
//       listen: ['/ip4/0.0.0.0/tcp/0']
//     },
//     transports: [new TCP()],
//     streamMuxers: [new Mplex()],
//     connectionEncryption: [new Noise()],
//     pubsub: new FloodSub()
//   })

//   await node.start()
//   return node
// }

main().catch((e) => console.error(`Failed to run example:`, e))

