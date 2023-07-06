const router = require("express").Router();
const Chat = require("../db/models/Chat");
const MessageData = require("../db/models/MessageData");
const Participant = require("../db/models/Participant");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  try {
    const { id } = req.query;
    const participanting = await Participant.findAll({ where: { userId: id } });
    const participantsId = participanting.map((info) => info.dataValues.chatId);
    const privateChats = await Chat.findAll({
      where: { id: { [Op.in]: participantsId }, public: false },
    });
    const publicChats = await Chat.findAll({ where: { public: true } });
    const chats = [...publicChats, ...privateChats];
    res.send({ chats, participanting });
  } catch (error) {
    console.error(error);
  }
});

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

router.post("/:code", async (req, res) => {
  try {
    const { id } = req.body;
    const { code } = req.params;
    const chat = await Chat.findOne({ where: { code } });
    const newPar = await Participant.create({
      userId: id,
      chatId: chat.id,
    });
    const participanting = await Participant.findAll({ where: { userId: id } });
    const participantsId = participanting.map((info) => info.dataValues.chatId);
    const privateChats = await Chat.findAll({
      where: { id: { [Op.in]: participantsId }, public: false },
    });
    const publicChats = await Chat.findAll({ where: { public: true } });
    const chats = [...publicChats, ...privateChats];
    res.send({ chats, participanting });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
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

router.delete("/:code/:id", async (req, res) => {
  try {
    const { id, code } = req.params;
    const chat = await Chat.findAll({ where: { code: code } });
    const chatId = chat[0].dataValues.id;
    const deletedUserFromRoom = await Participant.findOne({
      where: { userId: id, chatId },
    });

    if (!deletedUserFromRoom) {
      return res.sendStatus(404);
    }
    await deletedUserFromRoom.destroy();
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
