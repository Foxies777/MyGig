import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap'
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { useLocation, NavLink } from 'react-router-dom';
import { login, registration } from '../http/userAPI';
function Auth() {
  const location = useLocation()
  const isLogin = location.pathname === LOGIN_ROUTE

  const [login, setLogin] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const click = async () => {
    if (isLogin) {
      const response = await login()
    } else {
      const response = await registration(login, email, password)
      console.log(response);

    }
  }

  return (
    <Container style={{ width: "100%", height: "100vh" }} 
    className='d-flex justify-content-around align-items-center flex-column p-4'>
      <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
      <Form className='d-flex flex-column gap-5 w-100'>
        {isLogin ?
          <>
            <Form.Control style={{ border: 'none', borderBottom: '1px solid #222', outline: 'none' }} placeholder='Логин' />
            <Form.Control style={{ border: 'none', borderBottom: '1px solid #222', outline: 'none' }} placeholder='Пароль' type='password' />
          </>
          :
          <>
            <Form.Control style={{ border: 'none', borderBottom: '1px solid #222', outline: 'none' }}
              value={login}
              onChange={e => setLogin(e.target.value)}
              placeholder='Логин' />
            <Form.Control style={{ border: 'none', borderBottom: '1px solid #222', outline: 'none' }}
              value={email}
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
    </Container>
  );
}

export default Auth;