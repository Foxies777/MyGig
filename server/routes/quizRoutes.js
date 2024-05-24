const Router = require('express');
const router = new Router();
const quizController = require('../controllers/quizController');

// Существующие маршруты для создания викторины, добавления вопроса и ответа
router.post('/create', quizController.createQuiz);
router.post('/add-question', quizController.addQuestion);
router.post('/add-answer', quizController.addAnswer);

router.get('/quizzes', quizController.getAllQuizzes);
router.get('/:id', quizController.getQuizById);
router.get('/:quiz_id/questions', quizController.getQuestionsByQuizId);
router.get('/question/:question_id/answers', quizController.getAnswersByQuestionId);
router.post('/submit-quiz', quizController.submitQuiz); 
router.get('/result/:user_quiz_id', quizController.getQuizResult);
router.get('/user/:user_id/results', quizController.getUserQuizResults);



module.exports = router;
