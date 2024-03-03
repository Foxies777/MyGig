require('dotenv').config(); 

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: 'postgres',
  dialectModule: require('pg'),
  port: 5432,
  logging: true, // Вы можете включить логирование, установив значение true
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Важно для подключения к некоторым облачным базам данных
    }
  },
  pool: {
    max: 5, // Максимальное количество подключений в пуле
    min: 0, // Минимальное количество подключений в пуле
    acquire: 30000, // Максимальное время в миллисекундах, в течение которого пул будет пытаться установить подключение перед выдачей ошибки
    idle: 10000 // Время в миллисекундах, после которого простаивающее подключение будет закрыто
  }
});
module.exports = sequelize;
// module.exports = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     dialect: 'postgres',
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//   }
// );




