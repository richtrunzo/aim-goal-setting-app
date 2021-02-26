
const jwt = require('jsonwebtoken'); // eslint-disable-line
const ClientError = require('./client-error'); // eslint-disable-line

function authorizationMiddleware(req, res, next) {
  console.log(req.headers);
  const token = req.headers['x-access-token'];
  console.log(token);
  if (!token) {
    throw new ClientError(401, 'authentication required');
  } else {
    req.user = jwt.verify(token, process.env.TOKEN_SECRET);
    next();
  }
}

module.exports = authorizationMiddleware;
