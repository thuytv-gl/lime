const { getWalletBalance } = require("../api/http/client/account-client");
const { getItemAvailability } = require("../api/http/client/inventory-client");
const orderRepository = require("../api/sqlite/order-repository");

module.exports.handleCreateOrder = async (msg) => {
  const { clientId, itemId, amount } = msg.data;
  await orderRepository.insertOrder(clientId, itemId, amount, 0);
  orderRepository.getOrderById(1);
  const itemAvailability = await getItemAvailability(itemId, msg.correlationId);

  if (itemAvailability.inStock < amount) 
    throw new Error('item out of stock');
  }

  // const walletBalance = await getWalletBalance(clientId, msg.correlationId);
}