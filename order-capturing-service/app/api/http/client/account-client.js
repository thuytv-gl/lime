const axios = require('axios').default;

const ACCOUNT_URL = process.env.ACCOUNT_URL || 'http://localhost:3002';

const account = axios.create({ baseURL: ACCOUNT_URL });
function getAccountById(accountId, correlationId) {
  return account.get(`/account/${accountId}`, {
    headers: {
      'x-correlation-id': correlationId
    }
  }).then(r => r.data);
}

module.exports = {
  getAccountById
}