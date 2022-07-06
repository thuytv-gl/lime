const db = require('./sqlite-client');

const TABLE_NAME = 'accounts';

const SCHEMA = `
  name TEXT,
  balance INTEGER
`;

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (${SCHEMA})`);

  const stmt = db.prepare(`INSERT INTO ${TABLE_NAME} VALUES (?,?)`);
  for (let i = 1; i < 11; i++) {
    stmt.run("Account " + i, 8 * i);
  }
  stmt.finalize();
});

function insertAccount(name, balance) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO ${TABLE_NAME} VALUES (?,?)`,
      [name, balance],
      function (err) {
        if (err) {
          return reject(err);
        }

        return resolve({ id: this.lastID });
      }
    );
  })
}

function getAccountById(accountId) {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM ${TABLE_NAME} WHERE rowId=${accountId}`, (err, item) => {
      if (err) {
        return reject(err);
      }

      return resolve(item);
    });
  });
}

async function updateAccountBalance(accountId, value, type) {
  const account = await getAccountById(accountId);

  if (type === 'add') {
    account.balance += value;
  } else if (type === 'subtract') {
    account.balance -= value;
  }

  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE ${TABLE_NAME} set balance = ${account.balance} WHERE rowId=${accountId}`,
      function (err) {
        if (err) {
          return reject(err);
        }

        return resolve(this.changes);
      }
    );
  });
}


module.exports = {
  insertAccount,
  getAccountById,
  updateAccountBalance,
}