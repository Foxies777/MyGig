const { Quiz, Question, Answer, User_Quiz, User_Quiz_Answer } = require('../models/models');

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

    // Новый метод для получения всех викторин
    async getAllQuizzes(req, res) {
        try {
            const quizzes = await Quiz.findAll();
            return res.json(quizzes);
        } catch (error) {
            console.error('Error fetching quizzes:', error);
            res.status(500).json({ message: 'Ошибка при получении викторин', error });
        }
    }

    // Новый метод для получения викторины по ID
    async getQuizById(req, res) {
        try {
            const { id } = req.params;
            const quiz = await Quiz.findByPk(id);
            if (!quiz) {
                return res.status(404).json({ message: 'Викторина не найдена' });
            }
            return res.json(quiz);
        } catch (error) {
            console.error('Error fetching quiz:', error);
            res.status(500).json({ message: 'Ошибка при получении викторины', error });
        }
    }

    // Новый метод для получения всех вопросов по ID викторины
    async getQuestionsByQuizId(req, res) {
        try {
            const { quiz_id } = req.params;
            const questions = await Question.findAll({ where: { quiz_id } });
            return res.json(questions);
        } catch (error) {
            console.error('Error fetching questions:', error);
            res.status(500).json({ message: 'Ошибка при получении вопросов', error });
        }
    }

    // Новый метод для получения всех ответов по ID вопроса
    async getAnswersByQuestionId(req, res) {
        try {
            const { question_id } = req.params;
            const answers = await Answer.findAll({ where: { question_id } });
            return res.json(answers);
        } catch (error) {
            console.error('Error fetching answers:', error);
            res.status(500).json({ message: 'Ошибка при получении ответов', error });
        }
    }

    async submitQuiz(req, res) {
        try {
            const { user_id, quiz_id, answers } = req.body;
            const quiz = await Quiz.findByPk(quiz_id);
            if (!quiz) {
                return res.status(404).json({ message: 'Викторина не найдена' });
            }
    
            const userQuiz = await User_Quiz.create({
                user_id,
                quiz_id,
                score: 0,
                completion_time: new Date(),
            });
    
            let totalScore = 0;
    
            for (const answer of answers) {
                await User_Quiz_Answer.create({
                    user_quiz_id: userQuiz.id,
                    answer_id: answer.answer_id,
                });
    
                const userAnswer = await Answer.findByPk(answer.answer_id);
                const question = await Question.findByPk(userAnswer.question_id);
                const correctAnswers = await Answer.findAll({
                    where: { question_id: userAnswer.question_id, is_correct: true }
                });
    
                if (question.type === 'single') {
                    if (correctAnswers.length === 1 && correctAnswers[0].id === userAnswer.id) {
                        totalScore += 1;
                    }
                } else if (question.type === 'multiple') {
                    const userCorrectAnswers = answers.filter(a => a.question_id === question.id && correctAnswers.map(ca => ca.id).includes(a.answer_id)).length;
                    totalScore += userCorrectAnswers / correctAnswers.length;
                }
            }
    
            await userQuiz.update({ score: totalScore });
    
            return res.json({ message: 'Ответы пользователя успешно записаны', score: totalScore });
        } catch (error) {
            console.error('Error submitting quiz:', error);
            res.status(500).json({ message: 'Ошибка при записи ответов пользователя', error });
        }
    }
}

module.exports = new QuizController();
