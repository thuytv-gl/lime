const accountsRepository = require('../../sqlite/account-repository');

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res
 */
async function getAccountById(req, res) {
  const { accountId } = req.params;
  res
  .status(200)
  .send(await accountsRepository.getAccountById(accountId));
}

module.exports = {
  getAccountById,
}