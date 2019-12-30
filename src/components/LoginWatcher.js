import React, { useContext, useEffect, useCallback } from 'react'
import { withCookies } from 'react-cookie'
import jwt_decode from 'jwt-decode'

import UserContext from '../UserContext'

// Handles setting globals for logins
const LoginWatcher = ({ cookies }) => {
    const cookieState = document.cookie
    const [, globalSetIsLoggedIn, globalSetUsername, globalSetUserID, globalSetAccess, globalSetToken] = useContext(UserContext)

    const clearGlobals = useCallback(() => {
        globalSetIsLoggedIn(false)
        globalSetUsername("")
        globalSetUserID(null)
        globalSetAccess("User")
        globalSetToken(null)
    }, [globalSetIsLoggedIn, globalSetUsername, globalSetUserID, globalSetAccess, globalSetToken])

    useEffect(() => {
        const cookieToken = cookies.get('token')

        if (cookieToken) {
            const token = jwt_decode(cookieToken)
            if (token.exp > (Date.now() / 1000)) {
                globalSetIsLoggedIn(true)
                globalSetUsername(token["Username"])
                globalSetUserID(Number(token["UserID"]))
                globalSetAccess(token["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])
                globalSetToken(cookieToken)
            } else {
                cookies.remove('token')
                clearGlobals()
            }
        } else {
            clearGlobals()
        }
    }, [cookies, cookieState, globalSetIsLoggedIn, globalSetUsername, globalSetUserID, globalSetAccess, globalSetToken, clearGlobals])

    return <></>
}

export default withCookies(LoginWatcher)