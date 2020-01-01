import React, { useEffect, useState, useRef } from 'react'
import { Redirect } from 'react-router-dom'
import { withCookies } from 'react-cookie'
import { toast } from 'react-toastify'

const Logout = ({ cookies, ...props }) => {
    const cookieState = useRef(document.cookie)
    const [cookieCleared, setCookieCleared] = useState(false)

    useEffect(() => {
        cookies.remove('token')
    }, [cookies])

    useEffect(() => {
        if (cookies.get('token'))
            cookies.remove('token')
        else
            setCookieCleared(true)
    }, [cookieState, cookies])

    useEffect(() => {
        if (cookieCleared)
            toast.info("You have been logged out")
    }, [cookieCleared])

    return <>
        {cookieCleared ?
            <Redirect to="/" />
            :
            <>
                <div>
                    Logging out...
                </div>
                <div style={{ fontSize: "0.8rem", color: "gray" }}>
                    Refresh if this gets stuck, sorry
                </div>
            </>}
    </>
}

export default withCookies(Logout)