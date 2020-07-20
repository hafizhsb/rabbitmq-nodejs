async function start() {
  const q = 'test'
  const conn = await require('amqplib').connect('amqp://localhost')
  const ch = await conn.createChannel()

  await ch.assertQueue(q)
  let count = 1
  setInterval(() => {
    ch.sendToQueue(q, Buffer.from(`message ${count}`))
    console.log(`send message ${count}`)
    count += 1
  }, 2000)
}

start()
