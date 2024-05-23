// store/quizStore.js
import { makeAutoObservable } from 'mobx';
import { fetchQuizzes, fetchQuizById, fetchQuestionsByQuizId, fetchAnswersByQuestionId, submitQuiz } from '../http/quiz';

export default class QuizStore {
    constructor() {
        this._quizzes = [];
        this._quiz = null;
        this._questions = [];
        this._answers = {};
        this._userAnswers = {};
        this._loading = false;
        makeAutoObservable(this);
    }

    setQuizzes(quizzes) {
        this._quizzes = quizzes;
    }

    setQuiz(quiz) {
        this._quiz = quiz;
    }

    setQuestions(questions) {
        this._questions = questions;
    }

    setAnswers(answers) {
        this._answers = answers;
    }

    setUserAnswers(userAnswers) {
        this._userAnswers = userAnswers;
    }

    setLoading(loading) {
        this._loading = loading;
    }

    get quizzes() {
        return this._quizzes;
    }

    get quiz() {
        return this._quiz;
    }

    get questions() {
        return this._questions;
    }

    get answers() {
        return this._answers;
    }

    get userAnswers() {
        return this._userAnswers;
    }

    get loading() {
        return this._loading;
    }

    async loadQuizzes() {
        this.setLoading(true);
        try {
            const quizzes = await fetchQuizzes();
            this.setQuizzes(quizzes);
        } catch (error) {
            console.error('Error loading quizzes:', error);
        } finally {
            this.setLoading(false);
        }
    }

    async loadQuiz(quizId) {
        this.setLoading(true);
        try {
            const quiz = await fetchQuizById(quizId);
            this.setQuiz(quiz);

            const questions = await fetchQuestionsByQuizId(quizId);
            this.setQuestions(questions);

            const answers = {};
            for (const question of questions) {
                const answerData = await fetchAnswersByQuestionId(question.id);
                answers[question.id] = answerData;
            }
            this.setAnswers(answers);
        } catch (error) {
            console.error('Error loading quiz:', error);
        } finally {
            this.setLoading(false);
        }
    }

    updateUserAnswer(questionId, answerId) {
        const question = this._questions.find(q => q.id === questionId);
        if (question.type === 'single') {
            this._userAnswers[questionId] = answerId;
        } else if (question.type === 'multiple') {
            const currentAnswers = this._userAnswers[questionId] || [];
            if (currentAnswers.includes(answerId)) {
                this._userAnswers[questionId] = currentAnswers.filter(id => id !== answerId);
            } else {
                this._userAnswers[questionId] = [...currentAnswers, answerId];
            }
        }
    }

    async submitQuiz(user_id) {
        this.setLoading(true);
        try {
            const answers = Object.keys(this._userAnswers).flatMap(questionId => {
                const question = this._questions.find(q => q.id === parseInt(questionId, 10));
                if (!question) return []; // Если вопрос не найден, пропускаем его

                const answerIds = this._userAnswers[questionId];
                return question.type === 'single'
                    ? [{ answer_id: answerIds }]
                    : answerIds.map(answer_id => ({ answer_id }));
            });

            await submitQuiz(user_id, this._quiz.id, answers);
            // Очистить ответы пользователя после отправки
            this.setUserAnswers({});
        } catch (error) {
            console.error('Error submitting quiz:', error);
        } finally {
            this.setLoading(false);
        }
    }
}