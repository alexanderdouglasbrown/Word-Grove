import React, { useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import {useCookies} from 'react-cookie'

import './css/LoginRegister.css'

const Register = props => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [, setCookie] = useCookies(['token'])

    const handleSubmit = e => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_API_URL}/api/register`, { username, password })
            .then(res => {
                if (res.data.error) {
                    toast.error(res.data.error)
                    return
                }

                setCookie('token', res.data.token)
            })
            .catch()
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h1>Registration</h1>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username" className="label">Username</label>
                        <div className="field">
                            <p className="control has-icons-left has-icons-right">
                                <input value={username} onChange={e => setUsername(e.target.value)} className="input" type="text" name="username" placeholder="Username" autoFocus required />
                                <span className="icon is-small is-left">
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                            </p>
                        </div>
                        <label htmlFor="password" className="label">Password</label>
                        <div className="field has-addons">
                            <p className="control is-expanded has-icons-left">
                                <input value={password} onChange={e => setPassword(e.target.value)} className="input" name="password" type={isPasswordVisible ? "input" : "password"} placeholder="Password" required />
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
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register