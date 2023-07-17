//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
// const ChatRoom = require("./models/ChatRoom");
const Chat = require("./models/Chat");
const Friend = require("./models/Friend");
const Participant = require("./models/Participant");
const MessageData = require("./models/MessageData");
const Event = require("./models/Event");

//associations could go here!

// FRIENDS!!!! 😎
User.hasMany(Friend);
Friend.belongsTo(User);

// USERS WHO ARE PARTICIPATING 🥸
User.hasMany(Participant);
Participant.belongsTo(User);

// PARTICIPANTS WHO ARE CHATING 🥳
Chat.hasMany(Participant);
Participant.belongsTo(Chat);

// MESSAGES WHO ARE IN A CHAT 🦔
Chat.hasMany(MessageData);
MessageData.belongsTo(Chat);

//Calendar EVENTS
User.hasMany(Event);
Event.belongsTo(User)

module.exports = {
  db,
  models: {
    User,
    Friend,
    Participant,
    Chat,
    MessageData,
    Event
  },
};
