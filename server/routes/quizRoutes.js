const Router = require('express')
const router = new Router()
const quizController = require('../controllers/quizController')

router.post('/create', quizController.createQuiz)
router.post('/add-question', quizController.addQuestion)
router.post('/add-answer', quizController.addAnswer)

module.exports = router
