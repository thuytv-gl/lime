const { getWalletBalance } = require("../api/http/client/account-client");
const { getItemAvailability } = require("../api/http/client/inventory-client");

module.exports.handleCreateOrder = async (msg) => {
  const { itemId, amount } = msg.data;
  console.log(msg)
  // const itemAvailability = await getItemAvailability(itemId, msg.correlationId);

  // if (itemAvailability.inStock < amount) {
  //   throw new Error('item out of stock');
  // }

  // const walletBalance = await getWalletBalance(clientId, msg.correlationId);
}