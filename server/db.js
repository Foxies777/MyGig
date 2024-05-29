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
      rejectUnauthorized: false 
    }
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Retry connection logic
const connectWithRetry = async (retries = 5, delay = 5000) => {
  while (retries > 0) {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      return;
    } catch (error) {
      console.error('Unable to connect to the database:', error.message);
      retries -= 1;
      console.log(`Retries left: ${retries}`);
      if (retries === 0) {
        process.exit(1);
      }
      await new Promise(res => setTimeout(res, delay));
    }
  }
};

connectWithRetry();

module.exports = sequelize;
