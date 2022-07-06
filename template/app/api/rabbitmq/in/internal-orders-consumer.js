const amqp = require('amqplib/callback_api');
const { handleCreateOrder } = require('../../../service/incoming-orders-handler');

const CONN_URL = process.env.AMQP_URL || 'amqp://localhost';
const internalOrdersExchange = 'internal-order-exchange';

const listeners = [];

amqp.connect(CONN_URL, function(err, connection) {
  if (err) {
    throw err;
  }

  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }

    channel.assertExchange(internalOrdersExchange, 'topic', {
      durable: false
    });

    channel.assertQueue('', {
      exclusive: true
      }, function(error2, q) {
        if (error2) {
          throw error2;
        }

      channel.bindQueue(q.queue, internalOrdersExchange, 'order.create');

      channel.consume(q.queue, async (msg) => {
        for (let i = 0, len = listeners.length; i < len; i++) {
          await listeners[i](JSON.parse(msg.content.toString()))
        }
        channel.ack(msg);
      }, { noAck: false })
    });

  });
});

module.exports = {
  addHandler(callback) {
    if (typeof callback === 'function') {
      listeners.push(callback);
    }
  }
}