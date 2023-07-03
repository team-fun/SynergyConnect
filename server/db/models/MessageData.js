const Sequelize = require("sequelize");
const db = require("../db");

const MessageData = db.define("message", {
  code: {
    type: Sequelize.STRING,
  },
  username: {
    type: Sequelize.STRING,
  },
  message: {
    type: Sequelize.STRING,
  },
  time: {
    type: Sequelize.STRING,
  },
});

module.exports = MessageData;
