import React, { useContext, useEffect, useState } from 'react'
import Navigation from '../components/Navigation'
import { Button, Card, Container } from 'react-bootstrap'
import { Context } from '../main'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Notifications from './Notifications'


const Profile = () => {
  const { user } = useContext(Context)
  const navigate = useNavigate()
  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
    navigate('/login')
  }
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setName(decodedToken.login);
      setEmail(decodedToken.email);
    }
  }, []);

  return (
    <Container>
      <h1>Профиль</h1>
      <Card
        className='my-3'
        border="none"
        style={{ width: '100%' }}>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
          <FontAwesomeIcon icon={faEnvelope} style={{marginRight: '1rem'}}/> {email}
          </Card.Text>
        </Card.Body>
      </Card>
      <Button
        onClick={() => logOut()}>Выйти</Button>
      <Navigation />
      <Notifications/>
    </Container>
  )
}

export default Profile