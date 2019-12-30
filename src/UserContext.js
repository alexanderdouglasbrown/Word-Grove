import React, { createContext, useState } from 'react'

const UserContext = createContext()

export const UserProvider = props => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState("")
    const [userID, setUserID] = useState(null)
    const [access, setAccess] = useState("User")
    const [token, setToken] = useState(null)

    return (<UserContext.Provider value={[{
        isLoggedIn,
        username,
        userID,
        access,
        token
    },
        setIsLoggedIn, setUsername, setUserID, setAccess, setToken]}>
        {props.children}
    </UserContext.Provider>)

}

export default UserContext