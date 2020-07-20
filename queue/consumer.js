
 async function start() {
  const q = 'test';
  const conn = await require('amqplib').connect('amqp://localhost');
  const ch = await conn.createChannel();
  
  await ch.assertQueue(q)
  ch.consume(q, (msg) => {
    if (msg !== null) {
      console.log(`receive ${msg.content.toString()}`);
      ch.ack(msg);
    }
  });
};

start();