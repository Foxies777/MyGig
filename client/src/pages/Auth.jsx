import React, { useContext, useState } from 'react';
import { LOGIN_ROUTE, MAP_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { login, registration } from '../http/userAPI';
import { observer } from 'mobx-react-lite';

import { Button, Container, Form } from 'react-bootstrap'
import { Context } from '../main';
import Navigation from '../components/Navigation';


const Auth = observer(() => {
  const { user } = useContext(Context)
  const location = useLocation()
  const navigate = useNavigate()
  const isLogin = location.pathname === LOGIN_ROUTE
  const [logins, setLogins] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(logins, password);
      } else {
        data = await registration(logins, email, password);
      }
      user.setUser(user);
      user.setIsAuth(true);
      navigate(MAP_ROUTE);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Произошла ошибка';

      alert(errorMessage);
    }
  };



  return (
    <Container style={{ width: "100%", height: "100vh" }}
      className='d-flex justify-content-around align-items-center flex-column p-4'>
      <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
      <Form className='d-flex flex-column gap-5 w-100'>
        {isLogin ?
          <>
            <Form.Control
              value={logins}
              onChange={e => setLogins(e.target.value)}
              style={{ border: 'none', borderBottom: '1px solid #222', outline: 'none' }}
              placeholder='Логин' />
            <Form.Control
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ border: 'none', borderBottom: '1px solid #222', outline: 'none' }}
              placeholder='Пароль'
              type='password' />
          </>
          :
          <>
            <Form.Control style={{ border: 'none', borderBottom: '1px solid #222', outline: 'none' }}
              value={logins}
              onChange={e => setLogins(e.target.value)}
              placeholder='Логин' />
            <Form.Control 
            style={{ border: 'none', borderBottom: '1px solid #222', outline: 'none' }}
              value={email}
              type='email'
              onChange={e => setEmail(e.target.value)}
              placeholder='Email' />
            <Form.Control style={{ border: 'none', borderBottom: '1px solid #222', outline: 'none' }}
              value={password}
              onChange={e => setPassword(e.target.value)}
              type='password'
              placeholder='Пароль' />
          </>
        }
        <Button onClick={click} style={{ background: "#222" }}>{isLogin ? 'Войти' : 'Зарегистрироваться'}</Button>
      </Form>
      {isLogin ?
        <div><NavLink to={REGISTRATION_ROUTE}>Регистрация</NavLink></div>
        :
        <div><NavLink to={LOGIN_ROUTE}>Вход</NavLink></div>
      }

      <Navigation />
    </Container>
  );
})

export default Auth;