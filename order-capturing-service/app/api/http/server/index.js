const bodyParser = require('body-parser');
const helmet = require('helmet');
const express = require('express');
const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');

const { createLogger } = require('../../../logger');
const orders = require('./orders');

const logger = createLogger(require.main.filename);

/**
 * 
 * @param {import('express').Application} app 
 * @description available enpoints goes here
 */
function initRoutes(app) {
  app.post('/order', asyncHandler(orders.createOrder));
  app.get('/order/:orderId', asyncHandler(orders.getOrderById));
}

function createServer() {
  const app = express();

  app.use(helmet());
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))

  // parse application/json
  app.use(bodyParser.json())

  // extract correlationId from header
  // create new one if not exists
  app.use((req, res, next) => {
    req.correlationId = req.headers['x-correlation-id'] || uuidv4();
    next();
  });

  // log middleware
  app.use((req, res, next) => {
    logger.info({
      correlationId: req.correlationId,
      msg: `BEGIN: ${req.method} ${req.path} -> ${JSON.stringify(req.body)}`
    });
    res.on('finish', (...params) => {
      logger.info({
        correlationId: req.correlationId,
        msg: `END(${res.statusCode}): ${req.method} ${req.path} -> ${JSON.stringify(req.body)}`
      });
    });
    next();
  });

  app.get('/ping', (_, res) => res.end('pong'));
  app.get('/swagger.yaml', (_, res) => res.sendFile(__dirname + '/swagger.yaml'));

  initRoutes(app);

  app.use((err, req, res, next) => {
    logger.error({ msg: err, correlationId: req.correlationId });
  });

  const port = process.env.PORT || 3000;
  let server = null;

  return {
    start() {
      return new Promise((rs, _) => {
        server = app.listen(port, () => {
          logger.info({ msg: 'app started at http://localhost:' + port });
          rs();
        });
      });
    },
    stop() {
      if (server) {
        server.close();
        setImmediate(function () { server.emit('close') });
      }
    }
  };
}

module.exports = createServer;