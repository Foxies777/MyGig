import React, { useContext, useState } from 'react';
import { Button, Container, Form, FormControl } from 'react-bootstrap';
import { createStreet, updateStreet } from '../http/streetAPI';
import { useNavigate } from 'react-router-dom';
import { Context } from '../main';
import EditableTable from '../components/EditableTable';
import Navigation from '../components/Navigation';

const Admin = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editingStreetId, setEditingStreetId] = useState(null);

  const { user } = useContext(Context);
  const navigate = useNavigate();

  const handleEdit = (street) => {
    setName(street.street_name);
    setDescription(street.description);
    setEditingStreetId(street.id);
    setEditMode(true);
  };

  const handleCancel = () => {
    setName('');
    setDescription('');
    setEditMode(false);
  };

  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
    navigate('/login')
  }

  const handleDelete = (id) => {
    deleteStreet(id).then(() => {
      console.log("Улица удалена");
    }).catch(error => {
      console.error("Ошибка при удалении улицы: ", error);
    });
  };

  const handleUpdate = () => {
    updateStreet(editingStreetId, name, description).then(() => {
      setName('');
      setDescription('');
      setEditMode(false);
    });
  };

  const addStreet = () => {
    createStreet(name, description).then(() => {
      setName('');
      setDescription('');
    });
  };

  return (
    <div>
      <Container>
        <h1>{editMode ? 'Редактировать улицу' : 'Добавить улицу'}</h1>
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
          {editMode ? (
            <>
              <Button className='mt-3' onClick={handleUpdate}>Редактировать</Button>
              <Button className='mt-3' style={{ marginLeft: '10px' }} onClick={handleCancel}>Отмена</Button>
            </>
          ) : (
            <div className='d-flex justify-content-between'>
              <Button className='mt-3' onClick={addStreet}>Добавить</Button>
              <Button className='mt-3' onClick={logOut}>Выйти</Button>
            </div>
          )}
        </Form>
        <EditableTable onEdit={handleEdit} onDelete={handleDelete} />
      </Container>

      <Navigation />
    </div>
  );
};

export default Admin;
