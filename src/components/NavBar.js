import React, { useContext, useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'

import UserContext from '../UserContext'

import './css/NavBar.css'

const NavBar = () => {
    const [userData] = useContext(UserContext)
    const [isUsernameDropdownActive, setIsUsernameDropdownActive] = useState(false)

    const handleClick = useCallback(e => {
        const target = e.target.id
        if (isUsernameDropdownActive && !(target === "dropdown" || target === "hamburgerDropdown"))
            setIsUsernameDropdownActive(false)
    }, [isUsernameDropdownActive])

    useEffect(() => {
        window.addEventListener('click', handleClick)
        return () => window.removeEventListener('click', handleClick)
    }, [handleClick])

    return (
        <nav style={{ marginBottom: "1rem" }} className="navbar is-dark" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className="navbar-item NavBar-brand" to="/">Word Grove</Link>
                <div id="hamburgerDropdown" onClick={() => setIsUsernameDropdownActive(!isUsernameDropdownActive)} role="button" className={`${isUsernameDropdownActive ? "is-active" : ""} navbar-burger`} aria-label="menu" aria-expanded="false">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </div>
            </div>

            <div className={`${isUsernameDropdownActive ? "is-active" : ""} navbar-menu`}>
                <div className="navbar-end">
                    {userData.isLoggedIn ?
                        <div id={"navbar-username-dropdown-button"} className={`navbar-item has-dropdown ${isUsernameDropdownActive ? "is-active" : ""}`}>
                            <div id="dropdown" className="navbar-link" onClick={() => setIsUsernameDropdownActive(!isUsernameDropdownActive)}>
                                {userData.username}
                            </div>

                            <div className="navbar-dropdown">
                                <Link className="navbar-item" to={`/p/${userData.username}`}>Profile</Link>
                                <Link className="navbar-item" to={`/settings`}>Settings</Link>
                                <hr className="navbar-divider" />
                                <Link className="navbar-item" to={"/logout"}>Log Out</Link>
                            </div>
                        </div>
                        :
                        <div className="navbar-item">
                            <div className="buttons">
                                <Link className="button is-dark" to={"/register"}>Register</Link>
                                <Link className="button is-primary" to={"/login"}><strong>Log In</strong></Link>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </nav >
    )
}

export default NavBar