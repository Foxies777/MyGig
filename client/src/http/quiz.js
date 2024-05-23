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

// Новый метод для получения всех викторин
export const fetchQuizzes = async () => {
    const { data } = await $host.get('api/quiz/quizzes');
    return data;
};

// Новый метод для получения викторины по ID
export const fetchQuizById = async (id) => {
    const { data } = await $host.get(`api/quiz/${id}`);
    return data;
};

// Новый метод для получения всех вопросов по ID викторины
export const fetchQuestionsByQuizId = async (quiz_id) => {
    const { data } = await $host.get(`api/quiz/${quiz_id}/questions`);
    return data;
};

// Новый метод для получения всех ответов по ID вопроса
export const fetchAnswersByQuestionId = async (question_id) => {
    const { data } = await $host.get(`api/quiz/question/${question_id}/answers`);
    return data;
};

// Метод для обновления викторины
export const updateQuiz = async (id, title, description, start_time, end_time) => {
    const { data } = await $authhost.put(`api/quiz/update/${id}`, { title, description, start_time, end_time });
    return data;
};

// Метод для удаления викторины
export const deleteQuiz = async (id) => {
    const { data } = await $authhost.delete(`api/quiz/delete/${id}`);
    return data;
};
export const submitQuiz = async (user_id, quiz_id, answers) => {
    const { data } = await $authhost.post('api/quiz/submit-quiz', { user_id, quiz_id, answers });
    return data;
};