// const router = require("express").Router();
// const Chat = require("../db/models/Chat");

// router.post('/:code', async (req, res) => {
//   try {
//     const { code } = req.params;
//     const { messageData } = req.body;
    
//     const chat = new Chat({
//         code: code,
//         messageData: messageData
//     });
//     console.log("THIS IS CODE", code)

//     const savedChat = await chat.save();
//     res.status(201).json(savedChat);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// module.exports = router;
