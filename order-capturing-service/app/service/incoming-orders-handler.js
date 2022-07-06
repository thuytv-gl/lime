const accountClient = require("../api/http/client/account-client");
const inventoryClient = require("../api/http/client/inventory-client");
const orderRepository = require("../api/sqlite/order-repository");

module.exports.handleCreateOrder = async (msg) => {
  const { orderId } = msg.data;
  const order = await orderRepository.getOrderById(orderId);
  const orderingItem = await inventoryClient.getItemById(order.itemId, msg.correlationId);
  
  console.log('[x] orderingItem', orderingItem, order);

  if (orderingItem.inStock < order.quantity) {
    order.status = 'OOF'; // Out Of Stock
    return orderRepository.udpateOrder(orderId, order);
  }

  order.totalCost = +orderingItem.price * +order.quantity;
  
  const account = await accountClient.getAccountById(order.clientId, msg.correlationId);

  if (account.balance < order.totalCost) {
    order.status = 'BIS'; // Balance In Short
    return orderRepository.udpateOrder(orderId, order);
  }

  order.status = 'ORDERED';
  await orderRepository.udpateOrder(orderId, order);
}