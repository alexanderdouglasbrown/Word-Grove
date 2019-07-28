import React from 'react'
import {Link} from 'react-router-dom'

import './css/NavBar.css'

const NavBar = props => {
    return (
        <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className="navbar-item NavBar-brand" to="/">
                    Word Hole
                </Link>
            </div>
            <div className="navbar-end">
                <div className="navbar-item">
                    <div className="buttons">
                        <Link className="button is-dark" to={"register"}>
                            Register
                         </Link>
                        <Link className="button is-primary" to={"login"}>
                            <strong>Log in</strong>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar