import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { faBell, faMap, faUser, faBars, faTimes, faBrain } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ADMIN_ROUTE, MAP_ROUTE, NOTIFICATION_ROUTE, PROFILE_ROUTE, QUIZLIST_ROUTE } from '../utils/consts';
import { Context } from '../main';
import { jwtDecode } from 'jwt-decode';

const Navigation = () => {
    const { user } = useContext(Context);
    const profileLink = user.isAuth ? PROFILE_ROUTE : '/login';

    const [userRole, setUserRole] = useState("USER");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUserRole(decodedToken.role);
        }
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav style={{ backgroundColor: '#fff' }}>
            {user.isAuth ? (
                <>
                    <NavLink to={MAP_ROUTE}><FontAwesomeIcon icon={faMap} style={{ color: "#222", margin: '0 10px' }} /></NavLink>
                    <div onClick={toggleMenu} style={{ cursor: 'pointer' }}>
                        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} style={{ color: "#222", margin: '0 10px' }} />
                    </div>
                    {isMenuOpen && (
                        <div style={{ display: 'flex', gap: '30px', position: 'absolute', top: '-50px', backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '5px', padding: '10px' }}>
                            <NavLink to={NOTIFICATION_ROUTE}><FontAwesomeIcon icon={faBell} style={{ color: "#222", margin: '5px 0' }} /></NavLink>
                            <NavLink to={QUIZLIST_ROUTE}><FontAwesomeIcon icon={faBrain} style={{ color: "#222", margin: '5px 0' }} /></NavLink>
                        </div>
                    )}
                    <NavLink to={userRole === 'ADMIN' ? ADMIN_ROUTE : profileLink}><FontAwesomeIcon icon={faUser} style={{ color: "#222", margin: '0 10px' }} /></NavLink>
                </>
            ) : (
                <>
                    <NavLink to={MAP_ROUTE}><FontAwesomeIcon icon={faMap} style={{ color: "#222", margin: '0 10px' }} /></NavLink>
                    <NavLink to={profileLink}><FontAwesomeIcon icon={faUser} style={{ color: "#222", margin: '0 10px' }} /></NavLink>
                </>
            )}
        </nav>
    );
}

export default Navigation;
