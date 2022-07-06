const db = require('./sqlite-client');

const TABLE_NAME='orders'

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
    clientId TEXT,
    itemId TEXT,
    quantity INTEGER,
    totalCost INTEGER
  )`);
});

function insertOrder(clientId, itemId, quantity, totalCost) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO ${TABLE_NAME} VALUES (?,?,?,?)`,
      [clientId, itemId, quantity, totalCost],
      function (err) {
        if (err) {
          return reject(err);
        }

        return resolve({ id: this.lastID });
      }
    );
  })
}

function getOrderById(orderId) {
  db.all(`SELECT * FROM ${TABLE_NAME} WHERE rowId=1`, (err, row) => {
    console.log(row);
  });
}

module.exports = {
  getOrderById,
  insertOrder
}