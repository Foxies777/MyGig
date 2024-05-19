// quizController.js

const { Quiz, Question, Answer } = require('../models/models');

class QuizController {
    async createQuiz(req, res) {
        try {
            let { title, description, start_time, end_time } = req.body;

            start_time = new Date(start_time);
            end_time = new Date(end_time);

            // Проверка на корректность временных меток
            if (isNaN(start_time.getTime()) || isNaN(end_time.getTime())) {
                return res.status(400).json({ message: 'Некорректный формат временных меток' });
            }

            const quiz = await Quiz.create({ title, description, start_time, end_time });
            return res.json(quiz);
        } catch (error) {
            console.error('Error creating quiz:', error);
            res.status(500).json({ message: 'Ошибка при создании квиза', error });
        }
    }

    async addQuestion(req, res) {
        try {
            const { quiz_id, text, type } = req.body;
            const question = await Question.create({ quiz_id, text, type });
            return res.json(question);
        } catch (error) {
            console.error('Error adding question:', error);
            res.status(500).json({ message: 'Ошибка при добавлении вопроса', error });
        }
    }

    async addAnswer(req, res) {
        try {
            const { question_id, text, is_correct } = req.body;
            const answer = await Answer.create({ question_id, text, is_correct });
            return res.json(answer);
        } catch (error) {
            console.error('Error adding answer:', error);
            res.status(500).json({ message: 'Ошибка при добавлении ответа', error });
        }
    }
}

module.exports = new QuizController();
