import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import Question from './Question';
import { createQuiz, addQuestion, addAnswer } from '../../http/quiz';
import './CreateQuiz.scss';

const CreateQuiz = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [questions, setQuestions] = useState([{ text: '', type: 'single', answers: [{ text: '', is_correct: false }, { text: '', is_correct: false }] }]);

    const addQuestions = () => {
        setQuestions([...questions, { text: '', type: 'single', answers: [{ text: '', is_correct: false }, { text: '', is_correct: false }] }]);
    };

    const updateQuestion = (index, question) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index] = question;
        setQuestions(updatedQuestions);
    };

    const removeQuestion = (index) => {
        const updatedQuestions = questions.filter((_, qIndex) => qIndex !== index);
        setQuestions(updatedQuestions);
    };

    const handleSubmit = async () => {
        const newQuiz = await createQuiz(title, description, startTime, endTime);
        // Обработка добавления вопросов и ответов к новому квизу
        questions.forEach(async (question) => {
            const newQuestion = await addQuestion(newQuiz.id, question.text, question.type);
            question.answers.forEach(async (answer) => {
                await addAnswer(newQuestion.id, answer.text, answer.is_correct);
            });
        });
        console.log(newQuiz);
    };

    return (
        <Container className='mb-5'>
            <h1>Создание Викторины</h1>
            <Form>
                <Form.Group controlId="quizTitle">
                    <Form.Label>Название</Form.Label>
                    <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="quizDescription">
                    <Form.Label>Описание</Form.Label>
                    <Form.Control type="text" value={description} onChange={e => setDescription(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="quizStartTime">
                    <Form.Label>Дата начала</Form.Label>
                    <Form.Control type="datetime-local" value={startTime} onChange={e => setStartTime(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="quizEndTime">
                    <Form.Label>Дата окончания</Form.Label>
                    <Form.Control type="datetime-local" value={endTime} onChange={e => setEndTime(e.target.value)} />
                </Form.Group>
                {questions.map((question, index) => (
                    <Card className='mt-3' key={index}>
                        <Card.Body>
                            <Question
                                index={index}
                                question={question}
                                updateQuestion={updateQuestion}
                                removeQuestion={removeQuestion}
                            />
                        </Card.Body>
                    </Card>
                ))}
                <div className='my-4 w-100 rounded dashed-border' onClick={addQuestions}>
                    <span>Добавить вопрос</span>
                </div>
                <Button variant="success" onClick={handleSubmit}>Создать Викторину</Button>
            </Form>
        </Container>
    );
};

export default CreateQuiz;
