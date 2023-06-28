const Sequelize = require("sequelize");
const db = require("../db");

const Friend = db.define("friend", {
  friendsUserId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  pending: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Friend;
