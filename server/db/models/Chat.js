const Sequelize = require("sequelize");
const db = require("../db");

const Chat = db.define("chat", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
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
  image: {
    type: Sequelize.STRING,
    defaultValue:
      "https://www.pngall.com/wp-content/uploads/2016/04/Chat-PNG.png",
  },
});

module.exports = Chat;
