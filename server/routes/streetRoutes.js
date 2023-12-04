const Router = require('express')
const router = new Router()
const streetController = require('../controllers/streetController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('ADMIN'), streetController.create)
router.get('/', streetController.getAllStreets)

module.exports = router