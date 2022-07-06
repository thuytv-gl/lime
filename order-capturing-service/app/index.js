require('dotenv').config();
const internalOrdersConsumer = require('./api/rabbitmq/in/internal-orders-consumer');
const createServer = require("./api/http/server");
const { handleCreateOrder } = require('./service/incoming-orders-handler');

createServer();

internalOrdersConsumer.addHandler(handleCreateOrder);