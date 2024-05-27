import React, { useEffect, useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Card, Button, Form, Modal } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '../main';
import { jwtDecode } from 'jwt-decode';
import Navigation from '../components/Navigation';

const Quiz = observer(() => {
    const { quizId } = useParams();
    const navigate = useNavigate();
    const { quizStore } = useContext(Context);
    const [userId, setUserId] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        quizStore.loadQuiz(quizId);
    }, [quizStore, quizId]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken.id);
        }
    }, []);

    useEffect(() => {
        if (userId) {
            const checkUserQuizStatus = async () => {
                const quizResults = await quizStore.loadQuizResultsForUser(userId);
                console.log(quizResults);
                const userQuizStatus = quizResults.find(result => result.quiz_id === parseInt(quizId, 10));
                if (userQuizStatus) {
                    setShowModal(true);
                }
            };
            checkUserQuizStatus();
        }
    }, [userId, quizStore, quizId]);

    const handleAnswerChange = (questionId, answerId) => {
        quizStore.updateUserAnswer(questionId, answerId);
    };

    const handleSubmit = async () => {
        await quizStore.submitQuiz(userId);
        navigate('/profile');
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate(-1);
    };

    if (quizStore.loading) {
        return <div>Загрузка...</div>;
    }

    if (!quizStore.quiz) {
        return <div>Викторина не найдена</div>;
    }

    return (
        <Container className='mb-4'>
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

            <Button className="mt-4 mb-5" onClick={handleSubmit}>Отправить ответы</Button>
            <Navigation />

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Викторина завершена</Modal.Title>
                </Modal.Header>
                <Modal.Body>Вы уже прошли эту викторину.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Вернуться назад
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
});

export default Quiz;
