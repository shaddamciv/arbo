import { execute } from './graphclient/index.js'
import WebSocket, { WebSocketServer } from 'ws';
import * as Diff from 'diff';

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

      // if(diff && diff[1] && (diff[1].added || diff[1].removed)) {
        publish(data) //publish data if there is a change
        oldData = data
      // }
      
      if (i >= 1000000000000000000000) {
        console.log('ALL DONE!')
        break // triggers clearInterval above
      }
    }
  })()
}
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
const wss = new WebSocketServer({ port: 8080 });

const clients = new Map();

wss.on('connection', (ws) => {
  const id = uuidv4();
  const color = Math.floor(Math.random() * 360);
  const metadata = { id, color };

  // ws.on('message', (messageAsString) => {
  //   const message = JSON.parse(messageAsString);
  //     const metadata = clients.get(ws);

  //     message.sender = metadata.id;
  //     message.color = metadata.color;
  //   });
  clients.set(ws, metadata);
  ws.on("close", () => {
    clients.delete(ws);
  });
});

function publish(data){
  console.log('Published ', JSON.stringify(data));

  [...clients.keys()].forEach((client) => {
    client.send(JSON.stringify(data));
  });
}

main().catch((e) => console.error(`Failed to run example:`, e))
