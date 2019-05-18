import React, { useEffect } from 'react'
import axios from 'axios'

const Wakeup = props => {
    const spamWakeup = () => {
        console.log(`${process.env.REACT_APP_API_URL}/api/wakeup`)
        axios.get(`${process.env.REACT_APP_API_URL}/api/wakeup`)
            .then((_) => {
                window.location = '/hole'
            })
            .catch((error) => {
                console.log("Trying again...")
                setTimeout(() => { spamWakeup() }, 1000)
            })
    }

    useEffect(() => {
        spamWakeup()
    })

    return (<>
        Wakeup screen
    </>)
}

export default Wakeup