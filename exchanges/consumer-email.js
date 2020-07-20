
 async function start() {
  const queue = 'email';
  const conn = await require('amqplib').connect('amqp://localhost');
  const ch = await conn.createChannel();
  
  ch.consume(queue, (msg) => {
    if (msg !== null) {
      console.log(`send email for ${msg.content.toString()}`);
      ch.ack(msg);
    }
  });
};

start();