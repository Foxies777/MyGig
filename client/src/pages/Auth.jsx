import React, { useContext, useState } from 'react';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { useLocation, NavLink } from 'react-router-dom';
import { login, registration } from '../http/userAPI';
import { observer } from 'mobx-react-lite';

import { Button, Container, Form } from 'react-bootstrap'
import { Context } from '../main';


const Auth = observer(() => {
  const {user} = useContext(Context)
  const location = useLocation()
  const isLogin = location.pathname === LOGIN_ROUTE

  const [login, setLogin] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const click = async () => {
    let data
    if (isLogin) {
      data = await login(login, password)
    } else {
      data = await registration(login, email, password)
    }
    user.setUser(user)
    user.setIsAuth(true)
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
})

export default Auth;