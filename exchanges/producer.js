
 async function start() {
  const exchange  = 'notif';

  const conn = await require('amqplib').connect('amqp://localhost');
  const ch = await conn.createChannel();

  let count = 1;
  setInterval(() => {
    ch.publish(exchange, '', Buffer.from(`message ${count}`));
    console.log(`send message ${count}`);
    count += 1;
  }, 1000)
};

start();