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
  app.get('/order', asyncHandler(orders.createOrder));
  app.post('/order', asyncHandler(orders.createOrder));
}

function createServer() {
  const app = express();

  app.use(helmet());

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

  initRoutes(app);

  app.use((err, req, res, next) => {
    logger.error({ msg: err, correlationId: req.correlationId });
    res.status(500).send('Something broke!')
  })

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    logger.info({ msg: 'app started at http://localhost:' + port });
  });
}

module.exports = createServer;