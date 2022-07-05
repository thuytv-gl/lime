const { sendCreateOrder } = require('../../rabbitmq/out/internal-orders-publisher');
const { getWalletBalance } = require('../client/account-client');
const { getItemAvailability } = require('../client/inventory-client');

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res
 */
async function createOrder(req, res) {
  if (req.method === 'GET') {
    throw new Error('WTF');
  }
  // const { clientId, itemId, amount } = req.body;
  await sendCreateOrder({ clientId: 123, itemId: 'abc', amount: 5 }, req.correlationId);
  res.status(202).end('processing');
}

module.exports = {
  createOrder
}