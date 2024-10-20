const http = {
  cors: (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allows all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Allowed methods
    res.setHeader('Access-Control-Allow-Headers', '*'); // Allowed headers
  
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.writeHead(204); // No Content
      return res.end();
    }
  },

  response: {
    success: (res, message) => {
      res.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify({ message }));
    },
    error: (res, code, error) => {
      res.writeHead(code, { 'Content-Type': 'application/json' }).end(JSON.stringify({ error }));
    },
  },

  dataSync: async (channel, data = {}, connected = true) => {
    // Synchronize data into external storage server
    const DATA_SERVICE = process.env.DATA_SERVICE || 'http://localhost:3000';

    const url = `${DATA_SERVICE}/api${channel}${connected ? '' : '/disconnect'}`;

    const options = {
      method: connected ? 'POST' : 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    if (connected) options.body = JSON.stringify(data);

    try {
      const response = await fetch(url, options);
  
      // if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Error: ${response.status} - ${errorDetails}`);
    }
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = http;
  