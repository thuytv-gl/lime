const amqp = require('amqplib/callback_api');
const { handleCreateOrder } = require('../../../service/incoming-orders-handler');

const CONN_URL = process.env.AMQP_URL || 'amqp://localhost';
const internalOrdersExchange = 'internal-order-exchange';

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
        await handleCreateOrder(JSON.parse(msg.content.toString()));
        channel.ack(msg);
      }, { noAck: false })
    });

  });
});