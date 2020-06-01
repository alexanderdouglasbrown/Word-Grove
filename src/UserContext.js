import React, { createContext, useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios'

const UserContext = createContext()

export const UserProvider = props => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState("")
    const [userID, setUserID] = useState(null)
    const [access, setAccess] = useState("User")
    const [token, setToken] = useState(window.localStorage.getItem('token'))

    const clearUser = () => {
        setIsLoggedIn(false)
        setUsername("")
        setUserID(null)
        setAccess("User")
        setToken(null)

        window.localStorage.removeItem('token')
        axios.defaults.headers.common['Authorization'] = null;
    }

    useEffect(() => {
        if (token) {
            const decodedToken = jwt_decode(token)
            if (decodedToken.exp > (Date.now() / 1000)) {
                axios.defaults.headers.common['Authorization'] = token;

                setIsLoggedIn(true)
                setUsername(decodedToken["Username"])
                setUserID(Number(decodedToken["UserID"]))
                setAccess(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])

                if (window.localStorage.getItem('token') !== token)
                    window.localStorage.setItem('token', token)
            } else {
                clearUser()
            }
        } else {
            clearUser()
        }
    }, [token])

    return (<UserContext.Provider value={[{
        isLoggedIn,
        username,
        userID,
        access,
        token
    },
        setToken]}>
        {props.children}
    </UserContext.Provider>)

}

export default UserContext