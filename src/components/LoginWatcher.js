import React, { useContext, useEffect } from 'react'
import { withCookies } from 'react-cookie'
import jwt_decode from 'jwt-decode'

import UserContext from '../UserContext'

// Handles setting globals for logins
const LoginWatcher = ({ cookies }) => {
    const cookieToken = cookies.get('token')
    const [, globalSetIsLoggedIn, globalSetUsername, globalSetUserID, globalSetAccess, globalSetToken] = useContext(UserContext)

    useEffect(() => {
        let token = null
        try {
            token = jwt_decode(cookieToken)
        } catch { }

        if (token) {
            if (token.exp > (Date.now() / 1000)) {
                globalSetIsLoggedIn(true)
                globalSetUsername(token["Username"])
                globalSetUserID(Number(token["UserID"]))
                globalSetAccess(token["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])
                globalSetToken(cookieToken)
            } else {
                cookies.remove('token')
            }
        } else {
            globalSetIsLoggedIn(false)
            globalSetUsername("")
            globalSetUserID(null)
            globalSetAccess("User")
            globalSetToken(null)
        }
    }, [cookies, cookieToken, globalSetIsLoggedIn, globalSetUsername, globalSetUserID, globalSetAccess, globalSetToken])

    return <></>
}

export default withCookies(LoginWatcher)