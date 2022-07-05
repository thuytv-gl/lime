require('dotenv').config();
require('./api/rabbitmq/in/internal-orders-consumer');
const createServer = require("./api/http/server");

createServer();