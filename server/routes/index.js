const Router = require('express')
const router = new Router()

const userRuter = require('./userRoutes')
const notificationsRoutes = require('./notificationsRoutes')
const streetRoutes = require('./streetRoutes')
const reviewRoutes = require('./reviewRoutes')
const ReviewCommentsRoutes = require('./ReviewCommentsRoutes')


router.use('/user', userRuter)
router.use('/street', streetRoutes)
router.use('/review', reviewRoutes)
router.use('/notifications', notificationsRoutes)
router.use('/reviewComment', ReviewCommentsRoutes)

module.exports = router