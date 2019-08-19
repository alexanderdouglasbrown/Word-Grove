import React, { useContext, useEffect } from 'react'
import { withCookies } from 'react-cookie'
import jwt_decode from 'jwt-decode'

import UserContext from '../UserContext'

// Handles setting globals for logins
const LoginWatcher = ({ cookies }) => {
    const token = cookies.get('token')
    const [, globalSetIsLoggedIn, globalSetUsername] = useContext(UserContext)

    useEffect(() => {
        if (cookies.get('token')) {
            globalSetIsLoggedIn(true)
            globalSetUsername(jwt_decode(cookies.get('token'))["Username"])
        } else {
            globalSetIsLoggedIn(false)
            globalSetUsername("")
        }
        // eslint-disable-next-line
    }, [cookies, token])
    return (<></>)
}

export default withCookies(LoginWatcher)