const axios = require('axios').default;

const INVENTORY_URL = process.env.INVENTORY_URL || 'http://localhost:3001';

const inventory = axios.create({ baseURL: INVENTORY_URL });

function getItemAvailability(itemId, correlationId)  {
  return inventory.get('/item/' + itemId, {
    headers: {
      'x-correlation-id': correlationId
    }
  }).then(r => r.data);
}

module.exports = {
  getItemAvailability
}