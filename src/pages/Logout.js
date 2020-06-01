import React, { useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'

import UserContext from '../UserContext'

const Logout = props => {
    const [userData, setToken] = useContext(UserContext)

    useEffect(() => {
        if (userData.token) {
            setToken(null)
            toast.info("You have been logged out")
        }
    }, [userData.token, setToken])

    return <>
        {userData.token ?
            <Redirect to="/" />
            :
            <div>
                Logging out...
            </div>
        }
    </>
}

export default Logout