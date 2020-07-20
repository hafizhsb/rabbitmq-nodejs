async function init() {
  const exchange = 'delay'
  const queue1 = 'delay'

  const conn = await require('amqplib').connect('amqp://localhost')
  const ch = await conn.createChannel()

  await ch.assertExchange(exchange, 'x-delayed-message', {
    autoDelete: false,
    durable: true,
    passive: true,
    arguments: {'x-delayed-type': 'direct'},
  })
  await ch.assertQueue(queue1)
  await ch.bindQueue(queue1, exchange)
}

init()
