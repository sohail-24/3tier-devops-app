const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "appdb",
  process.env.DB_USER || "appuser",
  process.env.DB_PASSWORD || "password123",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    logging: false,
  }
);

module.exports = sequelize;

