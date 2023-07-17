const router = require("express").Router();
const Chat = require("../db/models/Chat");

router.post("/", async (req, res, next) => {
  try {
    const { name, code, description, isPublic } = req.body;
    console.log(name, code, description, isPublic);
    const newChat = await Chat.create({
      name: name,
      code: code,
      description: description,
      public: isPublic,
    });
    console.log("NEWWWWWWWWWW", newChat);
    res.send(newChat);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
