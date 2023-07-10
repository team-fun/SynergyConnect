const Sequelize = require("sequelize");
const db = require("../db");

const Participant = db.define("participant", {
  favorite: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Participant;
