import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {    

    console.log('Client Connection started');
    
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    

    const payload = JSON.stringify({
        type: 'custom-message',
        payload: data.toString()
    })

    // ws.send(JSON.stringify(payload));

    // Todos excluyente
    wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(payload, { binary:false });
        }
      });
  });

//   ws.send('Greatings from server');

  ws.on('close', ()=> {
    console.log('Client disconnected');
    
  })

});

console.log('Server running on port http://localhost:3000');
