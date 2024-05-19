import React, { useContext, useState } from 'react';
import { Button, Container, Form, FormControl, Tab, Tabs } from 'react-bootstrap';
import { createStreet, updateStreet, deleteStreet } from '../http/streetAPI';
import { useNavigate } from 'react-router-dom';
import { Context } from '../main';
import EditableTable from '../components/EditableTable';
import Navigation from '../components/Navigation';
import { observer } from 'mobx-react-lite';
import CreateQuiz from '../components/CreateQuiz/CreateQuiz';


const Admin = observer(() => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editingStreetId, setEditingStreetId] = useState(null);

  const { user, streets } = useContext(Context);
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
    user.setUser({});
    user.setIsAuth(false);
    navigate('/login');
  };

  const handleDelete = async (id) => {
    try {
      await deleteStreet(id);
      streets.deleteStreet(id);
      console.log("Улица удалена");
    } catch (error) {
      console.error("Ошибка при удалении улицы: ", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedStreet = await updateStreet(editingStreetId, name, description);
      streets.updateStreet(updatedStreet);
      setName('');
      setDescription('');
      setEditMode(false);
      console.log("Улица обновлена");
    } catch (error) {
      console.error("Ошибка при обновлении улицы: ", error);
    }
  };

  const addStreet = async () => {
    try {
      const newStreet = await createStreet(name, description);
      streets.addStreet(newStreet);
      setName('');
      setDescription('');
      console.log("Улица добавлена");
    } catch (error) {
      console.error("Ошибка при добавлении улицы: ", error);
    }
  };

  return (
    <div>

      <Container>
        <Tabs
          defaultActiveKey="street"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="street" title="Добавить улицу">
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
          </Tab>
          <Tab eventKey="quiz" title="Добавить викторину">
            <CreateQuiz />
          </Tab>
        </Tabs>
      </Container>
      <Navigation />
    </div>
  );
});

export default Admin;
