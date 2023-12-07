import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { Button, Container, Form, FormControl } from 'react-bootstrap';
import { createStreet } from '../http/streetAPI';

const Admin = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const addStreet = () => {
    createStreet(name, description);

  };

  return (
    <div>
      <Container>
        <h1>Добавить улицу</h1>
        <Form className='mt-5'>
          <FormControl
            value={name}
            onChange={e => setName(e.target.value)}
            className='mt-3'
            placeholder='Название улицы'
          />
          <FormControl
            value={description}
            onChange={e => setDescription(e.target.value)}
            className='mt-3'
            as='textarea'
            rows={3}
            placeholder='Описание улицы'
          />
          <Button
            className='mt-3'
            onClick={addStreet}
            style={{ background: '#222', border: '1px solid #222' }}
          >
            Добавить
          </Button>
        </Form>
      </Container>
      <Navigation />
    </div>
  );
};

export default Admin;
