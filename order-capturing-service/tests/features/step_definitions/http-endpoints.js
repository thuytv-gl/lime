const { When, Then, Given, Before, After, BeforeAll } = require('@cucumber/cucumber');
const nock = require('nock');
const axios = require('axios').default;
const assert = require('assert');
const data = require('../../data/data-by-key');
const server = require('../../../app/index'); // spin up server

const inventoryUrl = 'http://localhost:3001';
const accountUrl = 'http://localhost:3002';
const client = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'x-correlation-id': 'test'
  }
});

const sleep = (ms) => new Promise((rs, _) => setTimeout(rs, ms));

Before(async function() {
  this.world = {
    lastOrderId: -1
  };
  await server.start();
  await sleep(1000);

  nock(inventoryUrl)
    .get('/item/1')
    .times(Infinity)
    .reply(200, { name: 'item 1', price: 10, inStock: 100 });

  nock(accountUrl)
    .get('/account/1')
    .times(Infinity)
    .reply(200, { name: 'account 1', balance: 100 })
});

When("I order {int} pieces of item with id {int}", async function (quantity, itemId) {
  const res = await client.post('/order', { clientId: 1, itemId, amount: quantity });
  this.world.lastOrderId = res.data.id;
});

Then("My lastest order have status of {string}", async function (status) {
  const res = await client.get('/order/' + this.world.lastOrderId);
  assert.equal(res.data.status, status);
});

When("I wait for {int} seconds", async(s) => {
  await sleep(s * 1000);
});

After(function () {
  server.stop();
  this.world = {
    lastOrderId: -1
  }
});