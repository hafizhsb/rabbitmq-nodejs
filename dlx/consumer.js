async function start() {
  const EMAIL_EXCHANGE_TTL = 'EMAIL_EXCHANGE_TTL'
  const queue = 'EMAIL_QUEUE'
  const conn = await require('amqplib').connect('amqp://localhost')
  const ch = await conn.createChannel()

  ch.consume(queue, (msg) => {
    if (msg !== null) {
      // console.log(`receive delayed message ${msg.content.toString()}`)
      // ch.ack(msg)
      const {message, attempt, content} = getAttemptAndUpdateContent(msg)
      if (attempt < 3) {
        console.log(
          `failed send message ${message} attempt ${attempt} publish to retry-${attempt}`,
        )
        ch.publish(EMAIL_EXCHANGE_TTL, `retry-${attempt}`, Buffer.from(content))
      } else {
        console.log(`success send message ${message} attempt ${attempt}`)
        ch.ack(msg)
      }
    }
  })
}

function getAttemptAndUpdateContent(msg) {
  const data = JSON.parse(msg.content.toString())
  data.tryAttempt = ++data.tryAttempt
  const message = data.message
  const attempt = data.tryAttempt
  const content = Buffer.from(JSON.stringify(data))
  return {message, attempt, content}
}

start()
