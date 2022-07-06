const axios = require('axios').default;

const ACCOUNT_URL = process.env.ACCOUNT_URL || 'http://localhost:5000';

const account = axios.create({ baseURL: ACCOUNT_URL });
function getWalletBalance(clientId, correlationId) {
  return account.get(`/${clientId}/balance`, {
    headers: {
      'x-correlation-id': correlationId
    }
  }).then(r => r.data);
}

module.exports = {
  getWalletBalance
}