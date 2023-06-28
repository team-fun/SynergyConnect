const Sequelize = require("sequelize");
const db = require("../db");

const Participant = db.define("chatroom", {
  chatCode: {
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
  messsageData: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: true,
    defaultValue: [],
  },
});

module.exports = Participant;
