const sequelize = require('../db')
const { DataTypes } = require('sequelize')

// User Model
const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    login: { type: DataTypes.STRING, unique: true, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: 'USER' },
})

// Street Model
const Street = sequelize.define('street', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    street_name: { type: DataTypes.STRING, unique: true, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
})

// Notification Model
const Notification = sequelize.define('notification', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    timestamp: { type: DataTypes.DATE, allowNull: false },
}, {
    timestamps: true,
})

// Quiz Model
const Quiz = sequelize.define('quiz', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    start_time: { type: DataTypes.DATE, allowNull: false },
    end_time: { type: DataTypes.DATE, allowNull: false },
}, {
    timestamps: true,
});

// Question Model
const Question = sequelize.define('question', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    quiz_id: { type: DataTypes.INTEGER, allowNull: false },
    text: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.ENUM('single', 'multiple'), allowNull: false },
})

// Answer Model
const Answer = sequelize.define('answer', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    question_id: { type: DataTypes.INTEGER, allowNull: false },
    text: { type: DataTypes.STRING, allowNull: false },
    is_correct: { type: DataTypes.BOOLEAN, allowNull: false },
})

// User_Quiz Model
const User_Quiz = sequelize.define('user_quiz', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    quiz_id: { type: DataTypes.INTEGER, allowNull: false },
    score: { type: DataTypes.INTEGER, allowNull: false },
    completion_time: { type: DataTypes.DATE, allowNull: false },
})

// User_Quiz_Answer Model
const User_Quiz_Answer = sequelize.define('user_quiz_answer', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_quiz_id: { type: DataTypes.INTEGER, allowNull: false },
    answer_id: { type: DataTypes.INTEGER, allowNull: false },
})

// Relationships
User.hasMany(Notification)
Notification.belongsTo(User)

Street.hasMany(Notification)
Notification.belongsTo(Street)

Quiz.hasMany(Question)
Question.belongsTo(Quiz)

Question.hasMany(Answer)
Answer.belongsTo(Question)

User.hasMany(User_Quiz)
User_Quiz.belongsTo(User)

User_Quiz.hasMany(User_Quiz_Answer)
User_Quiz_Answer.belongsTo(User_Quiz)

sequelize.sync({ alter: true }).then(() => {
    console.log("Database & tables created!");
});

module.exports = {
    User,
    Street,
    Notification,
    Quiz,
    Question,
    Answer,
    User_Quiz,
    User_Quiz_Answer
}
