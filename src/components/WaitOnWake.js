import React, { useState, useEffect } from 'react'
import axios from 'axios'

const WaitOnWake = props => {
    const [isVisible, setIsVisible] = useState(false)
    const { setIsServerAwake } = props

    useEffect(() => {
        if (!isVisible)
            setTimeout(() => setIsVisible(true), 700)
    }, [isVisible])

    useEffect(() => pingServer(), [])

    const pingServer = () => {
        axios.get(`/api/common/hello`)
            .then(() => setIsServerAwake(true))
            .catch(() => setTimeout(pingServer, 500))
    }

    return <>
        {isVisible ?
            <div className="container">
                <h2 className="subtitle" style={{ marginTop: "2rem" }}>Waking up the server...</h2>
                <progress className="progress is-small is-primary" max="100"></progress>
            </div>
            :
            <></>
        }
    </>
}

export default WaitOnWake