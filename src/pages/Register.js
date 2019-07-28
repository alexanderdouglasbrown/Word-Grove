import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import './css/LoginRegister.css'

const Register = props => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h1>Registration</h1>
                </div>
                <div className="card-body">
                    <label htmlFor="username" className="label">Username</label>
                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                            <input className="input" type="text" name="username" placeholder="Username" autoFocus required />
                            <span className="icon is-small is-left">
                                <FontAwesomeIcon icon={faUser} />
                            </span>
                        </p>
                    </div>
                    <label htmlFor="password" className="label">Password</label>
                    <div className="field has-addons">
                        <p className="control is-expanded has-icons-left">
                            <input className="input" name="password" type={isPasswordVisible ? "input" : "password"} placeholder="Password" required />
                            <span className="icon is-small is-left">
                                <FontAwesomeIcon icon={faLock} />
                            </span>
                        </p>
                        <div className="control">
                            <div onClick={() => setIsPasswordVisible(!isPasswordVisible)} className="button" style={{ width: "3rem" }}>
                                <FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeSlash} />
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <p className="control">
                            <button type="submit" className="button is-primary">Register</button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register