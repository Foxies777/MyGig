// components/AppRouter.js
import React, { useContext, useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import { Context } from '../main';
import { observer } from 'mobx-react-lite';
import { jwtDecode } from 'jwt-decode';

const AppRouter = observer(() => {
    const { user } = useContext(Context);
    const [role, setRole] = useState('');
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setRole(decodedToken.role);
        }
    }, []);
    return (
        <Routes>
            {user.isAuth && role === 'ADMIN' && authRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} exact />
            ))}

            {user.isAuth && role !== 'ADMIN' && (
                <Route
                    path="/admin"
                    element={<Navigate to="/" />}
                />
            )}

            {user.isAuth && authRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} exact />
            ))}

            {publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} exact />
            ))}

            <Route path="*" element={<Navigate to={user.isAuth ? "/" : "/login"} />} />
        </Routes>
    );
});

export default AppRouter;
