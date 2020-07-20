
 async function init() {
  const exchange  = 'notif';
  const queue1 = 'email';
  const queue2 = 'sms';

  const conn = await require('amqplib').connect('amqp://localhost');
  const ch = await conn.createChannel();
  
  await ch.assertExchange(exchange, 'fanout');
  await ch.assertQueue(queue1);
  await ch.assertQueue(queue2);
  await ch.bindQueue(queue1, exchange);
  await ch.bindQueue(queue2, exchange);
};

init();