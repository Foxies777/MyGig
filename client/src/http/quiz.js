// quiz.js
import { $authhost, $host } from "./index";

export const createQuiz = async (title, description, start_time, end_time) => {
    start_time = new Date(start_time).toISOString();
    end_time = new Date(end_time).toISOString();
    const { data } = await $authhost.post('api/quiz/create', { title, description, start_time, end_time });
    return data;
};

export const addQuestion = async (quiz_id, text, type) => {
    const { data } = await $authhost.post('api/quiz/add-question', { quiz_id, text, type });
    return data;
};

export const addAnswer = async (question_id, text, is_correct) => {
    const { data } = await $authhost.post('api/quiz/add-answer', { question_id, text, is_correct });
    return data;
};

export const fetchQuizzes = async () => {
    const { data } = await $host.get('api/quiz/quizzes');
    return data;
};

export const fetchQuizById = async (id) => {
    const { data } = await $host.get(`api/quiz/${id}`);
    return data;
};

export const fetchQuestionsByQuizId = async (quiz_id) => {
    const { data } = await $host.get(`api/quiz/${quiz_id}/questions`);
    return data;
};

export const fetchAnswersByQuestionId = async (question_id) => {
    const { data } = await $host.get(`api/quiz/question/${question_id}/answers`);
    return data;
};

export const updateQuiz = async (id, title, description, start_time, end_time) => {
    const { data } = await $authhost.put(`api/quiz/update/${id}`, { title, description, start_time, end_time });
    return data;
};

export const deleteQuiz = async (id) => {
    const { data } = await $authhost.delete(`api/quiz/delete/${id}`);
    return data;
};

export const submitQuiz = async (user_id, quiz_id, answers) => {
    const { data } = await $authhost.post('api/quiz/submit-quiz', { user_id, quiz_id, answers });
    return data;
};

export const fetchQuizResult = async (user_quiz_id) => {
    const { data } = await $authhost.get(`api/quiz/result/${user_quiz_id}`);
    return data;
};

// Новый метод для получения результатов всех викторин пользователя
export const fetchQuizResultsForUser = async (user_id) => {
    const { data } = await $authhost.get(`api/quiz/user/${user_id}/results`);
    return data;
};
export const fetchUsersByQuizId = async (quizId) => {
    const { data } = await $authhost.get(`api/quiz/${quizId}/users`);
    return data;
};