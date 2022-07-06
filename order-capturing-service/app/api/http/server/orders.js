const orderRepository = require('../../sqlite/order-repository');
const { processOrder } = require('../../rabbitmq/out/internal-orders-publisher');

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res
 */
async function createOrder(req, res) {
  const { clientId, itemId, amount } = req.body;
  const newOrder = await orderRepository.insertOrder(clientId, itemId, amount, null, 'PROCESSING');
  await processOrder({ orderId: newOrder.id }, req.correlationId);
  res.status(202).send(newOrder);
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res
 */
async function getOrderById(req, res) {
  const { orderId } = req.params;
  const order = await orderRepository.getOrderById(orderId);
  res.status(200).send(order);
}

module.exports = {
  createOrder,
  getOrderById
}