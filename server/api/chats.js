const router = require("express").Router();
const Chat = require("../db/models/Chat");

router.get('/', async (res, req) => {
    try {
        const chats = Chat.findAll()
        res.send(chats)
    } catch (error) {
        console.error(error);
    }
})


module.exports = router;