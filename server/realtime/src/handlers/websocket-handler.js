const url = require('url');
const http = require('../utils/http-util');
const websocket = require('../utils/websocket-util');

const websocketHandler = (ws, req) => {
  const parsedUrl = url.parse(req.url, true);
  const channel = parsedUrl.pathname;
  const { mode } = parsedUrl.query || 'receiver';
  
  // Handle incoming messages (e.g., subscribe requests)
  const isSender = mode === 'sender';
  websocket.clients.subscribe(channel, { connection: ws, isSender });

  if (isSender) {
    // Send online activity from sender ro receivers
    const state = { status: { is_online: true } };

    // Broadcast the message to all connected clients (RECEIVER)
    websocket.clients.broadcast(channel, state);

    // Synchronize connectivity
    http.dataSync(channel, state);
  }

  // Listen for messages from the client
  ws.on('message', (message) => {
    const data = (() => { try { return JSON.parse(message); } catch { return {}; } })();

    // Distinguish between sender and receiver
    if (isSender) {
      // Broadcast the message to all connected clients (RECEIVER)
      websocket.clients.broadcast(channel, data);
  
      // Synchronize to data service
      http.dataSync(channel, data);
    }
  });

  ws.on('close', () => {
    if (isSender) {
      const state = { status: { is_online: false } };

      // Broadcast the message to all connected clients (RECEIVER)
      websocket.clients.broadcast(channel, state);

      // Synchronize disconnectivity, only if keep-alive is disabled
      http.dataSync(channel, state, false);
    }

    websocket.clients.unsubscribe(ws);
  });
};

module.exports = websocketHandler;
