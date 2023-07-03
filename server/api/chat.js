const router = require("express").Router();
const Chat = require("../db/models/Chat");

router.get("/:code", async (req, res) => {
  try {
    const { code } = req.params;
    const chat = await Chat.findOne({ where: { code } });
    res.send(chat.messageData);
  } catch (error) {
    console.error(error);
  }
});

router.post("/:code/save-history", async (req, res) => {
  try {
    const { code } = req.params;
    const { messageList } = req.body;

    const chat = await Chat.findOne({ where: { code } });

    console.log(chat);

    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    console.log(messageList);

    chat.messageData.push(messageList);
    await chat.save();

    res.status(200).json(messageList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
