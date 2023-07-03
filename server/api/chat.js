const router = require("express").Router();
const Chat = require("../db/models/Chat");
const MessageData = require("../db/models/MessageData");

router.get("/:code", async (req, res) => {
  try {
    const { code } = req.params;
    const chat = await Chat.findOne({ where: { code } });
    const chatId = chat.id;
    const messages = await MessageData.findAll({ where: { chatId } });
    res.send(messages);
  } catch (error) {
    console.error(error);
  }
});

router.post("/:code/save-history", async (req, res) => {
  try {
    const { code } = req.params;
    const { newMesssage } = req.body;
    const { id, username, message, time } = newMesssage;
    const chat = await Chat.findOne({ where: { code } });

    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    const createdMessage = await MessageData.create({
      id,
      username,
      message,
      time,
      chatId: chat.id,
    });

    res.status(200).json(createdMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
