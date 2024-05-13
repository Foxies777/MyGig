const sequelize = require('../db')
const { DataTypes } = require('sequelize')
const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    login: { type: DataTypes.STRING, unique: true, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: 'USER' },
})

const Street = sequelize.define('street', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    street_name: { type: DataTypes.STRING, unique: true, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
})

const Notification = sequelize.define('notification', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    timestamp: { type: DataTypes.DATE, allowNull: false },
})

const Quiz = sequelize.define('quiz', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    quiz: { type: DataTypes.STRING, allowNull: false },
})
const Question = sequelize.define('question', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    question: { type: DataTypes.STRING, allowNull: false },
    question_description: { type: DataTypes.STRING, allowNull: false },
})
const Answer = sequelize.define('answer', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    answer: {type: DataTypes.STRING, allowNull: false},
})


//User
User.hasMany(Notification)
Notification.belongsTo(User)


//Street
Street.hasMany(Notification)
Notification.belongsTo(Street)


module.exports = {
    User,
    Street,
    Notification
}