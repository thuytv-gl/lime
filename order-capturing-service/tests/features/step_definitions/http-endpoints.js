const { When, Then, Given } = require('@cucumber/cucumber');
const data = require('../../data/data-by-key');

When("I ask {string}", (statement) => {
  console.log('[x] statement', statement);
});