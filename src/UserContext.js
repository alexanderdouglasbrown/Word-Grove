import React, { createContext, useState } from 'react'

const UserContext = createContext()

export const UserProvider = props => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState("")

    return (<UserContext.Provider value={[{
        isLoggedIn,
        username
    },
        setIsLoggedIn, setUsername]}>
        {props.children}
    </UserContext.Provider>)

}

export default UserContext