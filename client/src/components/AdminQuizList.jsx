// components/AdminQuizList.js
import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '../main';
import { jwtDecode } from 'jwt-decode';  // Удалил фигурные скобки

const AdminQuizList = observer(() => {
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

    console.log(quizStore);
    return (
        <Container>
            <h1>Все Викторины</h1>
            <Row>
                {quizStore.quizzes.map((quiz) => (
                    <Col xs={12} md={6} lg={4} className="mt-4 d-flex" key={quiz.id}>
                        <Card className="h-100 flex-fill">
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>{quiz.title}</Card.Title>
                                <Card.Text className="flex-grow-1">{quiz.description}</Card.Text>
                                <Link to={`/admin/quiz/${quiz.id}`}>
                                    <Button variant="primary">Статистика</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
});

export default AdminQuizList;
