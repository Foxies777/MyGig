import React from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import Answer from './Answer';
import { FaTrashAlt } from 'react-icons/fa';

const Question = ({ index, question, updateQuestion, removeQuestion }) => {
    const handleTextChange = (e) => {
        updateQuestion(index, { ...question, text: e.target.value });
    };

    const handleTypeChange = (e) => {
        updateQuestion(index, { ...question, type: e.target.value });
    };

    const addAnswer = () => {
        const newAnswers = [...question.answers, { text: '', is_correct: false }];
        updateQuestion(index, { ...question, answers: newAnswers });
    };

    const removeAnswer = (answerIndex) => {
        const updatedAnswers = question.answers.filter((_, aIndex) => aIndex !== answerIndex);
        updateQuestion(index, { ...question, answers: updatedAnswers });
    };

    const updateAnswer = (answerIndex, answer) => {
        const updatedAnswers = [...question.answers];
        updatedAnswers[answerIndex] = answer;
        updateQuestion(index, { ...question, answers: updatedAnswers });
    };

    return (
        <Form.Group className="mb-4">
            <Row className='align-items-center'>
                <Col>
                    <Form.Label className="font-weight-bold">Вопрос {index + 1}</Form.Label>
                </Col>
                <Col className="d-flex justify-content-end">
                    <Button variant="danger" onClick={() => removeQuestion(index)} >
                        <FaTrashAlt />
                    </Button>
                </Col>
            </Row>
            <Form.Control type="text" value={question.text} onChange={handleTextChange} className="mb-3" />
            <Form.Group>
                <Form.Label className="font-weight-bold">Тип</Form.Label>
                <Form.Control as="select" value={question.type} onChange={handleTypeChange} className="mb-3">
                    <option value="single">Один ответ</option>
                    <option value="multiple">Несколько ответов</option>
                </Form.Control>
            </Form.Group>
            {question.answers.map((answer, answerIndex) => (
                <Answer
                    key={answerIndex}
                    questionIndex={index}
                    answerIndex={answerIndex}
                    answer={answer}
                    updateAnswer={updateAnswer}
                    removeAnswer={removeAnswer}
                    questionType={question.type}
                />
            ))}
            <div id='otvet' className='my-4 w-100 rounded dashed-border' onClick={addAnswer}>
                    <span>Добавить вариант</span>
                </div>
        </Form.Group>
    );
};

export default Question;
