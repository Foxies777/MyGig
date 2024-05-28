import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Button, Tabs, Tab } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import Countdown from 'react-countdown';
import { Context } from '../main';
import { jwtDecode } from 'jwt-decode';

const QuizList = observer(() => {
    const { quizStore } = useContext(Context);
    const [id, setId] = useState(null);
    const [activeQuizzes, setActiveQuizzes] = useState([]);
    const [inactiveQuizzes, setInactiveQuizzes] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setId(decodedToken.id);
        }
    }, []);

    useEffect(() => {
        quizStore.loadQuizzes();
    }, [quizStore]);

    useEffect(() => {
        if (id) {
            quizStore.loadQuizResultsForUser(id);
        }
    }, [id, quizStore]);

    useEffect(() => {
        if (quizStore.quizzes.length > 0) {
            const now = new Date();
            const active = quizStore.quizzes.filter(quiz => new Date(quiz.end_time) > now);
            const inactive = quizStore.quizzes.filter(quiz => new Date(quiz.end_time) <= now);
            setActiveQuizzes(active);
            setInactiveQuizzes(inactive);
        }
    }, [quizStore.quizzes]);

    if (quizStore.loading) {
        return <div>Загрузка...</div>;
    }

    return (
        <Container>
            <h1 className="mt-4">Доступные Викторины</h1>
            <Tabs defaultActiveKey="active" id="quiz-tabs" className="mb-3">
                <Tab eventKey="active" title="Активные Викторины">
                    {activeQuizzes.length !== 0 ? activeQuizzes.map((quiz) => {
                        const userResult = quizStore.quizResults[quiz.id];
                        return (
                            <Card className="mt-4" key={quiz.id}>
                                <Card.Body>
                                    <Card.Title>{quiz.title}</Card.Title>
                                    <Card.Text>{quiz.description}</Card.Text>
                                    <Card.Text>
                                        Время до окончания: <Countdown date={new Date(quiz.end_time)} />
                                    </Card.Text>
                                    {userResult ? (<>
                                        <Card.Text>
                                            Ваш результат: {userResult.score} / {userResult.totalPossibleScore} баллов
                                        </Card.Text>
                                        <Link to={`/quiz/stats/${quiz.id}`}>
                                            <Button variant="primary">Статистика</Button>
                                        </Link>
                                    </>
                                    ) : (
                                        <Link to={`/quiz/${quiz.id}`}>
                                            <Button variant="primary">Пройти Викторину</Button>
                                        </Link>
                                    )}
                                </Card.Body>
                            </Card>
                        );
                    }) : (
                        <>Викторин нет</>
                    )}
                </Tab>
                <Tab eventKey="inactive" title="Неактивные Викторины">
                    {inactiveQuizzes.map((quiz) => {
                        const userResult = quizStore.quizResults[quiz.id];
                        return (
                            <Card className="mt-4" key={quiz.id}>
                                <Card.Body>
                                    <Card.Title>{quiz.title}</Card.Title>
                                    <Card.Text>{quiz.description}</Card.Text>
                                    {userResult ? (
                                        <Card.Text>
                                            Ваш результат: {userResult.score} / {userResult.totalPossibleScore} баллов
                                        </Card.Text>
                                    ) : (
                                        <Card.Text>Викторина завершена</Card.Text>
                                    )}
                                    <Link to={`/quiz/stats/${quiz.id}`}>
                                        <Button variant="primary">Статистика</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </Tab>
            </Tabs>
        </Container>
    );
});

export default QuizList;
