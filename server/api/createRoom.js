const router = require("express").Router();
const Chat = require("../db/models/Chat");

router.post("/", async (req, res, next) => {
  try {
    const newChat = await Chat.create(req.body);
    res.send(newChat);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
