const { Sequelize } = require('sequelize');
const pg = require('pg');

pg.defaults.ssl = true;

module.exports = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialectModule: pg, // Явно указываем драйвер
    ssl: true, // Включаем SSL, если это необходимо
  }
);
