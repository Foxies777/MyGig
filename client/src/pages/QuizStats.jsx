// components/QuizStats.js
import React, { useEffect, useContext, useState } from 'react';
import { Container, Table, Card } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { Context } from '../main';
import Navigation from '../components/Navigation';

const QuizStats = observer(() => {
    const { quizStore } = useContext(Context);
    const { quizId } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            if (quizId) {
                setLoading(true);
                await quizStore.loadQuiz(quizId);  
                await quizStore.loadUsersByQuizId(quizId); 
                setLoading(false);
            }
        };
        fetchStats();
    }, [quizId, quizStore]);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    let users = (quizStore.usersByQuiz[quizId] || []).slice().sort((a, b) => b.score - a.score); // Создание нового массива и сортировка по баллам

    const winner = users[0];
    
    return (
        <Container>
            <Card className="mt-4">
                <Card.Body>
                    <Card.Title>Статистика Викторины</Card.Title>
                    <Card.Text>
                        <strong>Название викторины:</strong> {quizStore.quiz?.title}
                    </Card.Text>
                    {winner && (
                        <Card.Text>
                            <strong>Победитель:</strong> {winner.login} ({winner.email}), Баллы: {winner.score}
                        </Card.Text>
                    )}
                </Card.Body>
            </Card>
            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Логин</th>
                        <th>Почта</th>
                        <th>Баллы</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(participant => (
                        <tr key={participant.id}>
                            <td>{participant.id}</td>
                            <td>{participant.login}</td>
                            <td>{participant.email}</td>
                            <td>{participant.score}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Navigation/>
        </Container>
    );
});

export default QuizStats;
