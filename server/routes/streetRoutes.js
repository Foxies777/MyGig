const Router = require('express')
const router = new Router()
const streetController = require('../controllers/streetController')
const checkRole = require('../middleware/checkRoleMiddleware')

router
    .post('/', checkRole('ADMIN'), streetController.create)
    .get('/', streetController.getAllStreets)

router
    .put('/update/:id', checkRole('ADMIN'), streetController.update)

router
    .delete('/delete/:id', checkRole('ADMIN'), streetController.delete)

router
    .get('/search', streetController.searchByName)

module.exports = router