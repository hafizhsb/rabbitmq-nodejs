async function start() {
  const queue = 'delay'
  const conn = await require('amqplib').connect('amqp://localhost')
  const ch = await conn.createChannel()

  ch.consume(queue, (msg) => {
    if (msg !== null) {
      console.log(`receive delayed message ${msg.content.toString()}`)
      ch.ack(msg)
    }
  })
}

start()
