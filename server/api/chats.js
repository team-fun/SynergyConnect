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

  // router.post('/:code', async (req, res) => {
  //   try {
  //     const { code } = req.params;
  //     const { name, description, messageData } = req.body;
  
  //     const chat = await Chat.create({
  //       name,
  //       description,
  //       code,
  //       messageData: {
  //         message: messageData.message,
  //         name: messageData.name,
  //       },
  //     });
  
  //     console.log("THIS IS CODE", code);
  //     console.log("THIS IS MESSAGE DATA", messageData);
  
  //     res.status(201).send(chat);
  //   } catch (error) {
  //     console.error("Error creating chat:", error);
  //     res.status(500).json({ error: 'Internal server error' });
  //   }
  // });

  router.post("/:code/save-history", async (req, res) => {
    try {
      const { code } = req.params;
      const { messageData } = req.body;
  
      const chat = await Chat.findOne({ where: { code } });
  
      if (!chat) {
        return res.status(404).json({ error: "Chat not found" });
      }
  
      chat.messageData.push(messageData);
      await chat.save();
  
      res.status(200).json(messageData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  });
  


module.exports = router;
