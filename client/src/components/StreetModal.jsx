import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const StreetModal = ({ show, onHide, streetName, streetInfo }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{streetName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {streetInfo ? (
                    <div>
                        <p>{streetInfo[0].description}</p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default StreetModal;
