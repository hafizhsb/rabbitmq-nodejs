async function start() {
  const exchange = 'delay'

  const conn = await require('amqplib').connect('amqp://localhost')
  const ch = await conn.createChannel()

  let count = 1
  setInterval(() => {
    const opt = {
      headers: {
        'x-delay': 10000 * count,
      },
    }
    ch.publish(exchange, '', Buffer.from(`message ${count}`), opt)
    console.log(`send message ${count}`)
    count += 1
  }, 1000)
}

start()
