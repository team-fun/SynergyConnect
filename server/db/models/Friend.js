const Sequelize = require("sequelize");
const db = require("../db");
const DataTypes = Sequelize.DataTypes;

const Friend = db.define("friend", {
	friendsUserId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	// pending: {
	// 	type: DataTypes.ENUM("pending", "friend", "not friend"),
	// 	defaultValue: "pending",
	// },
	pending: {
		type: Sequelize.BOOLEAN,
		defaultValue: true,
	},
});

module.exports = Friend;
