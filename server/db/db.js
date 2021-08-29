const Sequelize = require("sequelize");

const dbConfig = require("./db.config.js");
const db = new Sequelize(dbConfig.DB,dbConfig.USER, dbConfig.PASSWORD, {
  logging: false,
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
});

module.exports = db;
