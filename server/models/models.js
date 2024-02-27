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
});


const Review = sequelize.define('review', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    text_review: { type: DataTypes.STRING, allowNull: false },
    rating: { type: DataTypes.INTEGER, defaultValue: 0 },
})

const ReviewComments = sequelize.define('reviewcomments', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    text_comment: { type: DataTypes.STRING, allowNull: false },
})


//User
User.hasMany(Notification)
Notification.belongsTo(User)

User.hasMany(Review)
Review.belongsTo(User)

User.hasMany(ReviewComments)
ReviewComments.belongsTo(User)

//Street
Street.hasMany(Notification)
Notification.belongsTo(Street)

Street.hasMany(Review)
Review.belongsTo(Street)

//Review
Review.hasMany(ReviewComments)
ReviewComments.belongsTo(Review)


module.exports = {
    User,
    Street,
    Notification,
    Review,
    ReviewComments
}