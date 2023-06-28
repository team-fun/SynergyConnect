const Sequelize = require("sequelize");
const db = require("../db");

const Chat = db.define("chat", {
  code: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  public: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  messageData: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: true,
    defaultValue: [],
  },
});

module.exports = Chat;
