const Sequelize = require("sequelize");
const db = require("../db");

const Participant = db.define("chatroom", {});

module.exports = Participant;
