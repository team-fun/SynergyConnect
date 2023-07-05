const router = require("express").Router();
const Chat = require("../db/models/Chat");

router.post("/", async (req, res, next) => {
  try {
    const { name, code, description, isPublic } = req.body
    const newChat = await Chat.create({ 
      name: name,
      code: code,
      description: description,
      public: isPublic
    });
    res.send(newChat);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
