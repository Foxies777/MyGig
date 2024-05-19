import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { FaTrashAlt } from 'react-icons/fa';

const Answer = ({ questionIndex, answerIndex, answer, updateAnswer, removeAnswer, questionType }) => {
    const handleTextChange = (e) => {
        updateAnswer(answerIndex, { ...answer, text: e.target.value });
    };

    const handleCorrectChange = (e) => {
        updateAnswer(answerIndex, { ...answer, is_correct: e.target.checked });
    };

    return (
        <Form.Group as={Row} className="align-items-center my-2">
            <Col xs={2} sm={1} className="d-flex justify-content-center">
                <Form.Check
                    type={questionType === 'single' ? 'radio' : 'checkbox'}
                    name={`correct-answer-${questionIndex}`}
                    label=""
                    checked={answer.is_correct}
                    onChange={handleCorrectChange}
                />
            </Col>
            <Col xs={8} sm={9} className="mb-2 mb-sm-0">
                <Form.Control
                    type="text"
                    placeholder={`Вариант ${answerIndex + 1}`}
                    value={answer.text}
                    onChange={handleTextChange}
                    className="answer-input"
                />
            </Col>
            <Col xs={2} sm={2} className="d-flex justify-content-end">
                <Button variant="link" onClick={() => removeAnswer(answerIndex)}>
                    <FaTrashAlt />
                </Button>
            </Col>
        </Form.Group>
    );
};

export default Answer;
