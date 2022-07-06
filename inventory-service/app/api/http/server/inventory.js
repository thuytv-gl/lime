const inventoryRepository = require('../../sqlite/inventory-repository');

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res
 */
async function getItemById(req, res) {
  const { itemId } = req.params;
  const item = await inventoryRepository.getItemById(itemId);
  res.status(200).send(item);
}

module.exports = {
  getItemById
}