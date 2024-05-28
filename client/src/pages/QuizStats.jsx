// components/QuizStats.js
import React, { useEffect, useContext, useState } from 'react';
import { Container, Table, Card } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { Context } from '../main';
import { jwtDecode } from 'jwt-decode';
import Navigation from '../components/Navigation';

const QuizStats = observer(() => {
    const { quizStore, user } = useContext(Context);
    const { quizId } = useParams();
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState(null);

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

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setRole(decodedToken.role);
        }
    }, []);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    let users = (quizStore.usersByQuiz[quizId] || []).slice().sort((a, b) => b.score - a.score);

    // Найти максимальный балл
    const maxScore = users.length > 0 ? users[0].score : null;
    // Найти всех пользователей с максимальным баллом
    const winners = users.filter(user => user.score === maxScore);

    return (
        <Container>
            <Card className="mt-4">
                <Card.Body>
                    <Card.Title>Статистика Викторины</Card.Title>
                    <Card.Text>
                        <strong>Название викторины:</strong> {quizStore.quiz?.title}
                    </Card.Text>
                    {winners.length > 0 && (
                        <div>
                            <strong>Победители:</strong>
                            <ul>
                                {winners.map(winner => (
                                    <li key={winner.id}>
                                        {winner.login} {role === 'ADMIN' ? `(${winner.email})` : null}, Баллы: {winner.score}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </Card.Body>
            </Card>
            <div className="table-responsive">
                <Table striped  hover className="mt-4">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Логин</th>
                            {role === 'ADMIN' && <th className="d-none d-md-table-cell">Почта</th>}
                            <th>Баллы</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(participant => (
                            <tr key={participant.id}>
                                <td>{participant.id}</td>
                                <td>{participant.login}</td>
                                {role === 'ADMIN' && <td className="d-none d-md-table-cell">{participant.email}</td>}
                                <td>{participant.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <Navigation />
        </Container>
    );
});

export default QuizStats;
