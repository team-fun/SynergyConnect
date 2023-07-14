const Sequelize = require("sequelize");
const pkg = require("../../package.json");

const databaseName =
  pkg.name + (process.env.NODE_ENV === "test" ? "-test" : "");

const config = {
  logging: false,
};

if (process.env.LOGGING === "true") {
  delete config.logging;
}

//https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
if (process.env.DATABASE_URL) {
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const db = new Sequelize({
  database: "synergyconnect", // Update the database name
  username: "synergyconnect_user", // Update the username
  password: "CNjJhjuewCBXkSxJb32GGd8nSjd14ryl", // Update with the provided password
  host: "dpg-ciopcutph6elhbprijh0-a.ohio-postgres.render.com", // Update the hostname
  port: 5432, // Update the port number
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
module.exports = db;
