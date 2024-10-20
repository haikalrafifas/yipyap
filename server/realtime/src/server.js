const http = require('http');
const WebSocket = require('ws');

const httpHandler = require('./handlers/http-handler');
const websocketHandler = require('./handlers/websocket-handler');

// Handle HTTP connections
const server = http.createServer(httpHandler);

// Handle WebSocket connections
const wss = new WebSocket.Server({ server });
wss.on('connection', websocketHandler);

// Start the broadcast server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Broadcast server is running on port ${PORT}`);
});
