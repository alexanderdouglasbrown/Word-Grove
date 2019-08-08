import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { withCookies } from 'react-cookie'

import './css/NavBar.css'

const NavBar = ({ cookies, ...props }) => {
    const token = cookies.get('token')
    const [isLoggedIn, setIsLoggedIn] = useState(!token)

    useEffect(() => {
        if (cookies.get('token')) {
            setIsLoggedIn(false)
        } else {
            setIsLoggedIn(true)
        }
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
                                <Link className="button is-dark" to={"register"}>Register</Link>
                                <Link className="button is-primary" to={"login"}><strong>Log In</strong></Link>
                            </>
                            : 
                            <>
                                <Link className="button" to={"logout"}>Log Out</Link>
                            </>}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default withCookies(NavBar)