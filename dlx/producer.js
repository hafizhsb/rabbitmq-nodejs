async function start() {
  const exchange = 'EMAIL_EXCHANGE_DLX'

  const conn = await require('amqplib').connect('amqp://localhost')
  const ch = await conn.createChannel()

  let count = 1
  setInterval(() => {
    ch.publish(
      exchange,
      '',
      Buffer.from(JSON.stringify({message: `message ${count}`, tryAttempt: 0})),
    )
    console.log(`send message ${count}`)
    count += 1
  }, 1000)
}

start()
