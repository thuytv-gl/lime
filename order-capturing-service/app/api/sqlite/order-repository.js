const db = require('./sqlite-client');

const TABLE_NAME='orders'

const SCHEMA = `
  clientId TEXT,
  itemId TEXT,
  quantity INTEGER,
  totalCost INTEGER,
  status TEXT
`;

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (${SCHEMA})`);
});

function insertOrder(clientId, itemId, quantity, totalCost, status) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO ${TABLE_NAME} VALUES (?,?,?,?,?)`,
      [clientId, itemId, quantity, totalCost, status],
      function (err) {
        if (err) {
          return reject(err);
        }

        return resolve({ id: this.lastID });
      }
    );
  })
}

function udpateOrder(orderId, data) {
  return new Promise((resolve, reject) => {
    const fieldsValues = Object.keys(data).map(k => `${k} = '${data[k]}'`);
    db.run(
      `UPDATE ${TABLE_NAME} set ${fieldsValues.join(',')} WHERE rowId=${orderId}`,
      function (err) {
        if (err) {
          return reject(err);
        }

        return resolve(this.changes);
      }
    );
  });
}

function getOrderById(orderId) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM ${TABLE_NAME} WHERE rowId=${orderId}`, (err, item) => {
      if (err) {
        return reject(err);
      }

      return resolve(item);
    });
  })
}

module.exports = {
  getOrderById,
  insertOrder,
  udpateOrder
}