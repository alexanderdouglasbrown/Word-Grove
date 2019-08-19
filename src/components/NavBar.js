import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { withCookies } from 'react-cookie'
import UserContext from '../UserContext'
import jwt_decode from 'jwt-decode'

import './css/NavBar.css'

const NavBar = ({ cookies, ...props }) => {
    const token = cookies.get('token')
    const [isLoggedIn, setIsLoggedIn] = useState(!!token)
    const [userData, globalSetIsLoggedIn, globalSetUsername] = useContext(UserContext)

    useEffect(() => {
        if (cookies.get('token')) {
            setIsLoggedIn(true)
            globalSetIsLoggedIn(true)
            globalSetUsername(jwt_decode(cookies.get('token'))["Username"])
        } else {
            setIsLoggedIn(false)
            globalSetIsLoggedIn(false)
            globalSetUsername("")
        }
        // eslint-disable-next-line
    }, [cookies, token])

    return (
        <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className="navbar-item NavBar-brand" to="/">Word Hole</Link>
            </div>
            <div className="navbar-end">
                <div className="navbar-item">
                    <div className="buttons">
                        {isLoggedIn ?
                            <>
                                <Link className="button">{userData.username}</Link>
                                <Link className="button" to={"logout"}>Log Out</Link>
                            </>
                            :
                            <>
                                <Link className="button is-dark" to={"register"}>Register</Link>
                                <Link className="button is-primary" to={"login"}><strong>Log In</strong></Link>
                            </>
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default withCookies(NavBar)