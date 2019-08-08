import React, { useEffect } from 'react'
import {Redirect} from 'react-router-dom'
import {withCookies} from 'react-cookie'
import { toast } from 'react-toastify';

const Logout = ({cookies, ...props}) => {
    useEffect(()=>{
        cookies.remove('token')
        toast.info("You have been logged out")
    }, [])

    return <Redirect to="/" />
}

export default withCookies(Logout)