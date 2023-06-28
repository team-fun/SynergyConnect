//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const ChatRoom = require("./models/ChatRoom");
const Friend = require("./models/Friend");
const Participant = require("./models/Participant");

//associations could go here!

module.exports = {
  db,
  models: {
    User,
    ChatRoom,
    Friend,
    Participant,
  },
};
