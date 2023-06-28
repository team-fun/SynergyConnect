//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const ChatRoom = require("./models/ChatRoom");
const Friend = require("./models/Friend");

//associations could go here!

module.exports = {
  db,
  models: {
    User,
    ChatRoom,
  },
};
