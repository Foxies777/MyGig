// pages/QuizList.js
import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '../main';

const QuizList = observer(() => {
    const { quizStore } = useContext(Context);

    useEffect(() => {
        quizStore.loadQuizzes();
    }, [quizStore]);

    if (quizStore.loading) {
        return <div>Загрузка...</div>;
    }

    return (
        <Container>
            <h1 className="mt-4">Доступные Викторины</h1>
            {quizStore.quizzes.map((quiz) => (
                <Card className="mt-4" key={quiz.id}>
                    <Card.Body>
                        <Card.Title>{quiz.title}</Card.Title>
                        <Card.Text>{quiz.description}</Card.Text>
                        <Link to={`/quiz/${quiz.id}`}>
                            <Button variant="primary">Пройти Викторину</Button>
                        </Link>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
});

export default QuizList;
