const amqp = require('amqplib/callback_api');
const { createLogger } = require('../../../logger');

const CONN_URL = process.env.AMQP_URL || 'amqp://localhost';
const internalOrdersExchange = 'internal-order-exchange';
const logger = createLogger(__filename);

let ch = null;

amqp.connect(CONN_URL, function (err, conn) {
  conn.createChannel(function (err2, channel) {
    ch = channel;

    channel.assertExchange(internalOrdersExchange, 'topic', {
      durable: false
    });
  });
});

module.exports.processOrder = async (data, correlationId) => {
  if (ch) {
    ch.publish(
      internalOrdersExchange,
      'order.create',
      Buffer.from(JSON.stringify({
        data,
        correlationId
      }))
    );

    logger.info({
      msg: JSON.stringify({
        broker: 'SENT',
        exchange: internalOrdersExchange,
        data
      }),
      correlationId: correlationId
    });
  } else {
    logger.error({ msg: 'Cannot connect to AMQP server', correlationId });
  }
}

process.on('exit', (code) => {
  ch && ch.close();
  console.log(`Closing rabbitmq channel`);
});