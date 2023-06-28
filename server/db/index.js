//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const ChatRoom = require("./models/ChatRoom");

//associations could go here!

User.belongsToMany(ChatRoom, { through: "UserChatRoom", as: "participants" });
ChatRoom.belongsToMany(User, { through: "UserChatRoom", as: "participants" });

module.exports = {
  db,
  models: {
    User,
    ChatRoom,
  },
};
