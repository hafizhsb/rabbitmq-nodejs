
 async function start() {
  const queue = 'sms';
  const conn = await require('amqplib').connect('amqp://localhost');
  const ch = await conn.createChannel();
  
  ch.consume(queue, (msg) => {
    if (msg !== null) {
      console.log(`send sms for message ${msg.content.toString()}`);
      ch.ack(msg);
    }
  });
};

start();