const router = require("express").Router();
const Chat = require("../db/models/Chat");

router.get("/", async (req, res) => {
  try {
    const chats = await Chat.findAll();
    res.send(chats);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
