const EMAIL_EXCHANGE_TTL = 'EMAIL_EXCHANGE_TTL'
const EMAIL_EXCHANGE_DLX = 'EMAIL_EXCHANGE_DLX'

const EMAIL_QUEUE = 'EMAIL_QUEUE'
const EMAIL_QUEUE_RETRY_1 = 'EMAIL_QUEUE_RETRY_1'
const EMAIL_QUEUE_RETRY_2 = 'EMAIL_QUEUE_RETRY_2'

async function init() {
  const conn = await require('amqplib').connect('amqp://localhost')
  const channel = await conn.createChannel()

  await assertExchanges(channel)
  await assertQueues(channel)
  await bindExchangesToQueues(channel)
}

function assertExchanges(channel) {
  channel.assertExchange(EMAIL_EXCHANGE_TTL, 'direct', {durable: true})
  channel.assertExchange(EMAIL_EXCHANGE_DLX, 'fanout', {durable: true})
}

function assertQueues(channel) {
  // email queue
  channel.assertQueue(EMAIL_QUEUE, {
    durable: true,
  })

  // retry 1
  channel.assertQueue(EMAIL_QUEUE_RETRY_1, {
    durable: true,
    deadLetterExchange: EMAIL_EXCHANGE_DLX,
    messageTtl: 10000,
  })

  // retry 2
  channel.assertQueue(EMAIL_QUEUE_RETRY_2, {
    durable: true,
    deadLetterExchange: EMAIL_EXCHANGE_DLX,
    messageTtl: 20000,
  })
}

function bindExchangesToQueues(channel) {
  channel.bindQueue(EMAIL_QUEUE, EMAIL_EXCHANGE_DLX)
  channel.bindQueue(EMAIL_QUEUE_RETRY_1, EMAIL_EXCHANGE_TTL, 'retry-1')
  channel.bindQueue(EMAIL_QUEUE_RETRY_2, EMAIL_EXCHANGE_TTL, 'retry-2')
}

init()
