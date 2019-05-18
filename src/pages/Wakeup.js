import React, { useEffect } from 'react'
import axios from 'axios'

const Wakeup = props => {
    const spamWakeup = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/wakeup`)
            .then((_) => {
                window.location = `${process.env.REACT_APP_BASE_NAME}hole`
            })
            .catch((error) => {
                setTimeout(() => { spamWakeup() }, 1000)
            })
    }

    useEffect(() => {
        spamWakeup()
    }, [])

    return (<>
        Wakeup screen
    </>)
}

export default Wakeup