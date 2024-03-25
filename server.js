const express = require("express");
const app = express();
const getChannel = require("./send");
const fs = require("fs");

app.use(express.json());
let channel;

const queueName = "Hello";
let connectAndConsume = async () => {
  channel = await getChannel(queueName);
  (await channel).consume(queueName, (msg) => {
    const messageContent = msg.content.toString();
    fs.appendFile("message.txt", "\n" + messageContent, (err) => {
      if (err) throw err;
    });
  });
};

connectAndConsume();

app.post("/send", async (req, res) => {
  try {
    const { data } = req.body;
    console.log(data);
    await channel.sendToQueue(queueName, Buffer.from(data));
    return res.status(200).json({ msg: "message send" });
  } catch (error) {
    return res.status(404).json({ msg: `Could not send message ${error}` });
  }
});

app.listen(3000);
