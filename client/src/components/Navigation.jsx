import React from 'react'
import { NavLink } from 'react-router-dom'
import { faBell, faMap, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MAP_ROUTE, NOTIFICATION_ROUTE, PROFILE_ROUTE } from '../utils/consts'

const Navigation = () => {
    return (
        <nav>
            <NavLink to={MAP_ROUTE}><FontAwesomeIcon icon={faMap} style={{ color: "#222", }} /></NavLink>
            <NavLink to={NOTIFICATION_ROUTE}><FontAwesomeIcon icon={faBell} style={{ color: "#222", }} /></NavLink>
            <NavLink to={PROFILE_ROUTE}><FontAwesomeIcon icon={faUser} style={{ color: "#222", }} /></NavLink>
        </nav>
    )
}

export default Navigation