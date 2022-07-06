const { placeOrder } = require('../../rabbitmq/out/internal-orders-publisher');

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res
 */
async function createOrder(req, res) {
  const { clientId, itemId, amount } = req.body;
  await placeOrder({ clientId, itemId, amount }, req.correlationId);
  res.status(202).end('processing');
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res
 */
async function getOrderById(req, res) {
  const { orderId } = req.params;
  res.status(200).end('orderId');
}

module.exports = {
  createOrder,
  getOrderById
}