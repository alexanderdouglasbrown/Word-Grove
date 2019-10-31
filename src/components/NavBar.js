import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import UserContext from '../UserContext'

import './css/NavBar.css'

const NavBar = () => {
    const [userData] = useContext(UserContext)
    const [isActive, setIsActive] = useState(false)

    return (
        <nav style={{ marginBottom: "1rem" }} className="navbar is-dark" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className="navbar-item NavBar-brand" to="/">Word Hole</Link>
                <div onClick={() => setIsActive(!isActive)} role="button" className={`${isActive ? "is-active" : ""} navbar-burger`} aria-label="menu" aria-expanded="false">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </div>
            </div>

            <div className={`${isActive ? "is-active" : ""} navbar-menu`}>
                <div className="navbar-end">
                    {userData.isLoggedIn ?
                        <div className="navbar-item has-dropdown is-hoverable">
                            <div className="navbar-link">
                                {userData.username}
                            </div>

                            <div className="navbar-dropdown">
                                <Link className="navbar-item" to={"/profile"}>Profile</Link>
                                <hr className="navbar-divider" />
                                <Link className="navbar-item" to={"logout"}>Log Out</Link>
                            </div>
                        </div>
                        :
                        <div className="navbar-item">
                            <div className="buttons">
                                <Link className="button is-dark" to={"register"}>Register</Link>
                                <Link className="button is-primary" to={"login"}><strong>Log In</strong></Link>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </nav >
    )
}

export default NavBar