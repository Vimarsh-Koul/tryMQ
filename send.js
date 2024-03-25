let amqp = require("amqplib");

let getChannel = async (queueName) => {
  const amqpServer = "amqp://127.0.0.1:5672";
  const connection = await amqp.connect(amqpServer);
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName);
  return channel;
};

module.exports = getChannel;
