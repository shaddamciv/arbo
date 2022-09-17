import { execute } from './graphclient/index.js'
import WebSocket, { WebSocketServer } from 'ws';
import * as Diff from 'diff';
const wss = new WebSocketServer({ port: 8080 });
let response
let oldData={}
async function main() {
  response = await execute(
    /* GraphQL */ `
      query ExampleQuery @live {
        arbos {
          id
          count
          owner
          maxGrowth
          currentGrowth
          gardeners {
            id
            amount
            address
          }
        }
      }
    `,
    {},
  )
  // console.log(response) // 1,2,3,4,5
  ;(async function () {
    let i = 0
    console.log('Waiting connection');
   
    for await (const data of response) {
      i++
      const diff = Diff.diffJson(oldData, data)

      if(diff && diff[1] && (diff[1].added || diff[1].removed)) {
        publish(data) //publish data if there is a change
        console.log(data)
        oldData = data
      }
      
      if (i >= 1000000000000000000000) {
        console.log('ALL DONE!')
        break // triggers clearInterval above
      }
    }
  })()
}

function publish(data){
  wss.on('connection', function (ws) {

      ws.send(JSON.stringify(data), function () {
        //
        // Ignore errors.
        //
      })

  
    // ws.on('close', function () {
      
      
    // });
  });
}

main().catch((e) => console.error(`Failed to run example:`, e))
