import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { faBell, faMap, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ADMIN_ROUTE, MAP_ROUTE, NOTIFICATION_ROUTE, PROFILE_ROUTE } from '../utils/consts';
import { Context } from '../main';
import { jwtDecode } from 'jwt-decode';

const Navigation = () => {
    const { user } = useContext(Context);
    const profileLink = user.isAuth ? PROFILE_ROUTE : '/login';


    const [userRole, setUserRole] = useState("USER");
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUserRole(decodedToken.role);
        }
    }, []);
    return (
        <nav>
            {user.isAuth
                ? (
                    userRole === 'ADMIN' ?
                        <>
                            <NavLink to={MAP_ROUTE}><FontAwesomeIcon icon={faMap} style={{ color: "#222" }} /></NavLink>
                            <NavLink to={NOTIFICATION_ROUTE}><FontAwesomeIcon icon={faBell} style={{ color: "#222" }} /></NavLink>
                            <NavLink to={ADMIN_ROUTE}><FontAwesomeIcon icon={faUser} style={{ color: "#222" }} /></NavLink>
                        </>
                        :
                        <>
                            <NavLink to={MAP_ROUTE}><FontAwesomeIcon icon={faMap} style={{ color: "#222" }} /></NavLink>
                            <NavLink to={NOTIFICATION_ROUTE}><FontAwesomeIcon icon={faBell} style={{ color: "#222" }} /></NavLink>
                            <NavLink to={profileLink}><FontAwesomeIcon icon={faUser} style={{ color: "#222" }} /></NavLink>
                        </>
                )
                : (
                    <>
                        <NavLink to={MAP_ROUTE}><FontAwesomeIcon icon={faMap} style={{ color: "#222" }} /></NavLink>
                        <NavLink to={profileLink}><FontAwesomeIcon icon={faUser} style={{ color: "#222" }} /></NavLink>
                    </>
                )
            }
        </nav>
    );
}

export default Navigation;
