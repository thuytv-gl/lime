require('dotenv').config();
const internalOrdersConsumer = require('./api/rabbitmq/in/internal-orders-consumer');
const createServer = require("./api/http/server");
const { handleCreateOrder } = require('./service/incoming-orders-handler');

internalOrdersConsumer.addHandler(handleCreateOrder);
const server = createServer();

/* istanbul ignore next */
if (process.argv.includes('--up')) {
  server.start();
}

module.exports = server;
