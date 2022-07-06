const amqp = require('amqplib/callback_api');
const CONN_URL = process.env.AMQP_URL || 'amqp://localhost';
const internalOrdersExchange = 'internal-order-exchange';

let ch = null;

amqp.connect(CONN_URL, function (err, conn) {
  conn.createChannel(function (err, channel) {
    ch = channel;

    channel.assertExchange(internalOrdersExchange, 'topic', {
      durable: false
    });
  });
});

module.exports.placeOrder = async (data, correlationId) => {
  ch && ch.publish(
    internalOrdersExchange,
    'order.create',
    Buffer.from(JSON.stringify({
      data,
      correlationId
    }))
  );
}

process.on('exit', (code) => {
  ch && ch.close();
  console.log(`Closing rabbitmq channel`);
});