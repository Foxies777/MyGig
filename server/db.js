require('dotenv').config(); 

const { Sequelize } = require('sequelize');

// Ensure that the necessary environment variables are set
const databaseName = process.env.DATABASE_NAME;
const user = process.env.USER;
const password = process.env.PASSWORD;
const host = process.env.HOST;

if (!databaseName || !user || !password || !host) {
  console.error('One or more environment variables are missing: DATABASE_NAME, USER, PASSWORD, HOST');
  process.exit(1);
}

const sequelize = new Sequelize(databaseName, user, password, {
  host: host,
  dialect: 'postgres',
  dialectModule: require('pg'),
  port: 5432,
  logging: console.log, // Set logging to console.log or false
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Important for connecting to some cloud databases
    }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = sequelize;
