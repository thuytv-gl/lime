const db = require('./sqlite-client');

const TABLE_NAME='inventory'

const SCHEMA = `
  name TEXT,
  price INTEGER,
  inStock INTEGER
`;

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (${SCHEMA})`);

  const stmt = db.prepare(`INSERT INTO ${TABLE_NAME} VALUES (?,?,?)`);
  for (let i = 1; i < 11; i++) {
    stmt.run("Item " + i, 8 * i, i**2);
  }
  stmt.finalize();
});

function insertItem(name, price, inStock) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO ${TABLE_NAME} VALUES (?,?,?)`,
      [name, price, inStock],
      function (err) {
        if (err) {
          return reject(err);
        }

        return resolve({ id: this.lastID });
      }
    );
  })
}

function updateInStock(itemId, inStock) {
}

function getItemById(itemId) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM ${TABLE_NAME} WHERE rowId=${itemId}`, (err, item) => {
      if (err) {
        return reject(err);
      }

      return resolve(item);
    });
  });
}

module.exports = {
  insertItem,
  updateInStock,
  getItemById,
}