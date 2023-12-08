import React, { useContext, useState } from 'react';
import Navigation from '../components/Navigation';
import { Button, Col, Container, Form, FormControl, Row } from 'react-bootstrap';
import { createStreet } from '../http/streetAPI';
import { useNavigate } from 'react-router-dom';
import { Context } from '../main';

const Admin = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const { user } = useContext(Context)
  const navigate = useNavigate()
  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
    navigate('/login')
  }

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
          <Button
            className='mt-3'
            style={{ float: 'right', background: '#222', border: '1px solid #222' }}
            onClick={() => logOut()}
          >
            Выйти</Button>
        </Form>
      </Container>

      <Navigation />
      <Navigation />
    </div>
  );
};

export default Admin;
