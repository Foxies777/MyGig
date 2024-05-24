import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '../main';
import { jwtDecode } from 'jwt-decode';

const QuizList = observer(() => {
    const { quizStore } = useContext(Context);
    const [id, setId] = useState(null);

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

    if (quizStore.loading) {
        return <div>Загрузка...</div>;
    }

    console.log('Quiz results:', quizStore.quizResults); // Лог для проверки результатов викторин

    return (
        <Container>
            <h1 className="mt-4">Доступные Викторины</h1>
            {quizStore.quizzes.map((quiz) => {
                const userResult = quizStore.quizResults[quiz.id];
                console.log('User result for quiz', quiz.id, ':', userResult); // Лог для проверки результата пользователя для конкретного квиза
                return (
                    <Card className="mt-4" key={quiz.id}>
                        <Card.Body>
                            <Card.Title>{quiz.title}</Card.Title>
                            <Card.Text>{quiz.description}</Card.Text>
                            {userResult ? (
                                <Card.Text>
                                    Ваш результат: {userResult.score} баллов
                                </Card.Text>
                            ) : (
                                <Link to={`/quiz/${quiz.id}`}>
                                    <Button variant="primary">Пройти Викторину</Button>
                                </Link>
                            )}
                        </Card.Body>
                    </Card>
                );
            })}
        </Container>
    );
});

export default QuizList;
