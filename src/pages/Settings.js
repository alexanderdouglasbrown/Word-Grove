import React, { useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

import UserContext from '../UserContext'
import { toast } from 'react-toastify'

const Settings = props => {
    const [userData] = useContext(UserContext)

    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] = useState(false)
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false)
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)

    const handleSubmit = e => {
        e.preventDefault()

        axios.patch(`${process.env.REACT_APP_API_URL}/api/settings/password`,
            { Current: currentPassword, New: newPassword, Confirm: confirmPassword })
            .then(() => {
                toast.info("Password updated")
                setCurrentPassword("")
                setNewPassword("")
                setConfirmPassword("")
            })
            .catch(err => {
                if (err && err.response && err.response.data && err.response.data.error)
                    toast.error(err.response.data.error)
                else
                    toast.error("Sorry, an error occured")
            })
    }

    return <>
        {userData.isLoggedIn ?
            <div className="container">
                <div className="card">
                    <div className="card-title">
                        <h1>Update Password</h1>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="current-password" className="label">Current Password</label>
                            <div className="field has-addons">
                                <p className="control is-expanded">
                                    <input value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="input" name="current-password" type={isCurrentPasswordVisible ? "input" : "password"} placeholder="Current Password" required />
                                </p>
                                <div className="control">
                                    <div onClick={() => setIsCurrentPasswordVisible(!isCurrentPasswordVisible)} className="button" style={{ width: "3rem" }}>
                                        <FontAwesomeIcon icon={isCurrentPasswordVisible ? faEye : faEyeSlash} />
                                    </div>
                                </div>
                            </div>
                            <label htmlFor="new-password" className="label">New Password</label>
                            <div className="field has-addons">
                                <p className="control is-expanded">
                                    <input value={newPassword} onChange={e => setNewPassword(e.target.value)} className="input" name="new-password" type={isNewPasswordVisible ? "input" : "password"} placeholder="New Password" required />
                                </p>
                                <div className="control">
                                    <div onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)} className="button" style={{ width: "3rem" }}>
                                        <FontAwesomeIcon icon={isNewPasswordVisible ? faEye : faEyeSlash} />
                                    </div>
                                </div>
                            </div>
                            <label htmlFor="confirm-password" className="label">Confirm Password</label>
                            <div className="field has-addons">
                                <p className="control is-expanded">
                                    <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="input" name="confirm-password" type={isConfirmPasswordVisible ? "input" : "password"} placeholder="Confirm Password" required />
                                </p>
                                <div className="control">
                                    <div onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} className="button" style={{ width: "3rem" }}>
                                        <FontAwesomeIcon icon={isConfirmPasswordVisible ? faEye : faEyeSlash} />
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <p className="control">
                                    <button type="submit" className="button is-primary">Update</button>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            :
            <div className="container">
                Please log in or create an account to view this page.
        </div>}
    </>
}

export default Settings