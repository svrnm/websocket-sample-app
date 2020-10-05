function createId() {
  return '_' + Math.random().toString(36).substr(2, 9);
};

const ws = new WebSocket('ws://localhost:8080');
const timers = {}

ws.addEventListener('open', () => {
  // Send a message to the WebSocket server
  setInterval(() => {
    const msgId = createId();
    ws.send(JSON.stringify({ msgId: msgId, message: "Hello World" }));
    timers[msgId] = Date.now();	  
  }, 2000)
});

ws.addEventListener('message', event => {
  // The `event` object is a typical DOM event object, and the message data sent
  // by the server is stored in the `data` property
  console.log('Received:', event.data);
  const response = JSON.parse(event.data);
  reportWS({
    url: "ws://localhost:8080",
    respProcTime: Date.now() - timers[response.msgId]	  
  }) 	
});
