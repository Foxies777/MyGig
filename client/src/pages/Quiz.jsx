// pages/Quiz.js
import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Button, Form } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '../main';
import { jwtDecode } from 'jwt-decode';
import Navigation from '../components/Navigation';

const Quiz = observer(() => {
    const { quizId } = useParams();
    const { quizStore, user } = useContext(Context);
    const [id, setId] = useState('')
    useEffect(() => {
        quizStore.loadQuiz(quizId);
    }, [quizStore, quizId]);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setId(decodedToken.id);
        }
    }, []);
    const handleAnswerChange = (questionId, answerId) => {
        quizStore.updateUserAnswer(questionId, answerId);
    };

    const handleSubmit = async () => {
        
        await quizStore.submitQuiz(id);
        console.log('User Answers submitted');
    };

    if (quizStore.loading) {
        return <div>Загрузка...</div>;
    }

    if (!quizStore.quiz) {
        return <div>Викторина не найдена</div>;
    }

    return (
        <Container>
            <Card className="mt-4">
                <Card.Body>
                    <Card.Title>{quizStore.quiz.title}</Card.Title>
                    <Card.Text>{quizStore.quiz.description}</Card.Text>
                </Card.Body>
            </Card>

            {quizStore.questions.map((question) => (
                <Card className="mt-4" key={question.id}>
                    <Card.Body>
                        <Card.Title>{question.text}</Card.Title>
                        <Form>
                            {quizStore.answers[question.id]?.map((answer) => (
                                <Form.Check
                                    key={answer.id}
                                    type={question.type === 'single' ? 'radio' : 'checkbox'}
                                    label={answer.text}
                                    name={`question-${question.id}`}
                                    id={`answer-${answer.id}`}
                                    onChange={() => handleAnswerChange(question.id, answer.id)}
                                    checked={
                                        question.type === 'single'
                                            ? quizStore.userAnswers[question.id] === answer.id
                                            : (quizStore.userAnswers[question.id]?.includes(answer.id) || false)
                                    }
                                />
                            ))}
                        </Form>
                    </Card.Body>
                </Card>
            ))}

            <Button className="mt-4" onClick={handleSubmit}>Отправить ответы</Button>
            <Navigation />
        </Container>
    );
});

export default Quiz;
