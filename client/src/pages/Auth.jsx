import React, { useContext } from 'react';
import { LOGIN_ROUTE, MAP_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { login, registration } from '../http/userAPI';
import { observer } from 'mobx-react-lite';
import { Button, Container, Form } from 'react-bootstrap';
import { Context } from '../main';
import Navigation from '../components/Navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;

  const validationSchema = isLogin 
    ? Yup.object().shape({
        logins: Yup.string().required('Логин обязателен'),
        password: Yup.string().required('Пароль обязателен'),
      })
    : Yup.object().shape({
        logins: Yup.string()
          .matches(/^[a-zA-Z0-9_]*$/, 'Логин может содержать только буквы, цифры и символ подчеркивания')
          .min(3, 'Логин должен содержать не менее 3 символов')
          .required('Логин обязателен'),
        email: Yup.string()
          .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Некорректный email')
          .required('Email обязателен'),
        password: Yup.string()
          .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/, 
                   'Пароль должен содержать не менее 6 символов, одну заглавную букву и один специальный символ')
          .required('Пароль обязателен'),
      });

  const formik = useFormik({
    initialValues: {
      logins: '',
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        let data;
        if (isLogin) {
          data = await login(values.logins, values.password);
        } else {
          data = await registration(values.logins, values.email, values.password);
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
    }
  });

  return (
    <Container style={{ width: "100%", height: "100vh" }}
      className='d-flex justify-content-around align-items-center flex-column p-4'>
      <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
      <Form onSubmit={formik.handleSubmit} className='d-flex flex-column gap-5 w-100'>
        <Form.Control
          name='logins'
          value={formik.values.logins}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={{ border: 'none', borderBottom: '1px solid #222', outline: 'none' }}
          placeholder='Логин' />
        {formik.touched.logins && formik.errors.logins ? (
          <div className="text-danger">{formik.errors.logins}</div>
        ) : null}
        {!isLogin &&
          <>
            <Form.Control
              name='email'
              type='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{ border: 'none', borderBottom: '1px solid #222', outline: 'none' }}
              placeholder='Email' />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-danger">{formik.errors.email}</div>
            ) : null}
          </>
        }
        <Form.Control
          name='password'
          type='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={{ border: 'none', borderBottom: '1px solid #222', outline: 'none' }}
          placeholder='Пароль' />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-danger">{formik.errors.password}</div>
        ) : null}
        <Button type='submit' style={{ background: "#222" }}>{isLogin ? 'Войти' : 'Зарегистрироваться'}</Button>
      </Form>
      {isLogin ?
        <div><NavLink to={REGISTRATION_ROUTE}>Регистрация</NavLink></div>
        :
        <div><NavLink to={LOGIN_ROUTE}>Вход</NavLink></div>
      }
      <Navigation />
    </Container>
  );
});

export default Auth;
