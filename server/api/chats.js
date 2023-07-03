const router = require("express").Router();
const Chat = require("../db/models/Chat");
const MessageData = require("../db/models/MessageData");
const Participant = require("../db/models/Participant");
const { Op } = require("sequelize");

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const participanting = await Participant.findAll({ where: { userId: id } });
    const participantsId = participanting.map((info) => info.dataValues.chatId);
    const privateChats = await Chat.findAll({
      where: { id: { [Op.in]: participantsId }, public: false },
    });
    const publicChats = await Chat.findAll({ where: { public: true } });
    const result = [...publicChats, ...privateChats];
    res.send(result);
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
    console.log(chat.id);
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
    const result = [...publicChats, ...privateChats];
    res.send(result);
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

module.exports = router;
