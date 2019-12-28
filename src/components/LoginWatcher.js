import React, { useContext, useEffect } from 'react'
import { withCookies } from 'react-cookie'
import jwt_decode from 'jwt-decode'

import UserContext from '../UserContext'

// Handles setting globals for logins
const LoginWatcher = ({ cookies }) => {
    const cookieToken = cookies.get('token')
    const [, globalSetIsLoggedIn, globalSetUsername] = useContext(UserContext)

    useEffect(() => {
        let token = null
        try {
            token = jwt_decode(cookieToken)
        } catch { }

        if (token) {
            if (token.exp > (Date.now() / 1000)) {
                globalSetIsLoggedIn(true)
                globalSetUsername(token["Username"])
            } else {
                cookies.remove('token')
            }
        } else {
            globalSetIsLoggedIn(false)
            globalSetUsername("")
        }
    }, [cookies, cookieToken, globalSetIsLoggedIn, globalSetUsername])

    return <></>
}

export default withCookies(LoginWatcher)