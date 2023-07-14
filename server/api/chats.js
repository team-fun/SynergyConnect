const router = require("express").Router();
const Chat = require("../db/models/Chat");
const MessageData = require("../db/models/MessageData");
const Participant = require("../db/models/Participant");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  try {
    const { id } = req.query;
    const participating = await Participant.findAll({ where: { userId: id } });
    const allParticipants = await Participant.findAll();
    const participantsId = participating.map((info) => info.dataValues.chatId);
    const privateChats = await Chat.findAll({
      where: { id: { [Op.in]: participantsId }, public: false },
    });
    const publicChats = await Chat.findAll({ where: { public: true } });
    const chats = [...publicChats, ...privateChats];
    res.send({ chats, participating, allParticipants });
  } catch (error) {
    console.error(error);
  }
});

router.get("/:code/:id", async (req, res) => {
  try {
    const { code } = req.params;
    const { id } = req.params;
    const chat = await Chat.findOne({ where: { code } });
    const chatId = chat.id;
    const participating = await Participant.findOne({
      where: { userId: id, chatId },
    });
    if (!participating) {
      const newPar = await Participant.create({
        userId: id,
        chatId,
      });
    }
    const messages = await MessageData.findAll({ where: { chatId } });
    res.send({ messages, chat });
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
    const participating = await Participant.findAll({ where: { userId: id } });
    const allParticipants = await Participant.findAll();
    const participantsId = participating.map((info) => info.dataValues.chatId);
    const privateChats = await Chat.findAll({
      where: { id: { [Op.in]: participantsId }, public: false },
    });
    const publicChats = await Chat.findAll({ where: { public: true } });
    const chats = [...publicChats, ...privateChats];
    res.send({ chats, participating, allParticipants });
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
    const chat = await Chat.findOne({ where: { code: code } });
    const chatId = chat.dataValues.id;
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

router.put("/", async (req, res) => {
  try {
    const { favorite, isParticipating } = req.body;
    const whatParticipatent = await Participant.findByPk(isParticipating.id);
    whatParticipatent.update({ favorite });
    const participating = await Participant.findAll({
      where: { userId: isParticipating.userId },
    });
    const allParticipants = await Participant.findAll();
    const participantsId = participating.map((info) => info.dataValues.chatId);
    const privateChats = await Chat.findAll({
      where: { id: { [Op.in]: participantsId }, public: false },
    });
    const publicChats = await Chat.findAll({ where: { public: true } });
    const chats = [...publicChats, ...privateChats];
    res.send({ chats, participating, allParticipants });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
