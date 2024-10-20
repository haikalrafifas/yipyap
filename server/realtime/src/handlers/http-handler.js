const http = require('../utils/http-util');

const httpHandler = (req, res) => {
  http.cors(req, res);
  http.response.error(res, 404, 'Resource not found');
}

module.exports = httpHandler;
