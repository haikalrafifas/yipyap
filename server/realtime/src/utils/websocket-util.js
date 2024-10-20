const WebSocket = require('ws');
const clients = new Map();

const websocket = {
  clients: {
    subscribe: (channel, { connection, reconnect = false, isSender = false }) => {
      if (!clients.has(channel)) {
        clients.set(channel, new Set());
      }
      clients.get(channel).add({ connection, isSender });
    },

    broadcast: (channel, data) => {
      // Broadcast to all subscribers on the specified channel
      if (clients.has(channel)) {
        clients.get(channel).forEach(({ connection: client, isSender }) => {
          if (!isSender && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
          }
        });
      }
    },

    unsubscribe: (connection) => {
      clients.forEach((subscribers, _) => {
        // Directly remove the subscriber if it matches the connection
        subscribers.forEach(subscriber => {
          if (subscriber.connection === connection) {
            subscribers.delete(subscriber);
          }
        });
      });
    },
  },
};

module.exports = websocket;
