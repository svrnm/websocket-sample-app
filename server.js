const http = require('http');
const static = require('node-static');
const file = new static.Server('./');
const server = http.createServer((req, res) => {
  req.addListener('end', () => file.serve(req, res)).resume();
});
const port = 3210;
server.listen(port, () => console.log(`HTTP Server running at http://localhost:${port}`));

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });


console.log(`HTTP Server running at http://localhost:8080`);

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    const obj = JSON.parse(message);
    setTimeout(function timeout() {
      let response = JSON.stringify({ msgId: obj.msgId, message: Date.now() })
      console.log('send: %s', response); 	
      ws.send(response);
    }, 500);
  });
});
