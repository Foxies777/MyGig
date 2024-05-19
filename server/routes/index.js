const Router = require('express')
const router = new Router()

const userRuter = require('./userRoutes')
const notificationsRoutes = require('./notificationsRoutes')
const streetRoutes = require('./streetRoutes')
const quizRoutes = require('./quizRoutes')

router.use('/user', userRuter)
router.use('/street', streetRoutes)
router.use('/notifications', notificationsRoutes)
router.use('/quiz', quizRoutes)
module.exports = router