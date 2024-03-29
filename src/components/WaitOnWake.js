import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const WaitOnWake = props => {
    const [isVisible, setIsVisible] = useState(false)
    const { setIsServerAwake } = props

    useEffect(() => {
        if (!isVisible)
            setTimeout(() => setIsVisible(true), 700)
    }, [isVisible])

    const pingServer = useCallback(()=> {
        axios.get(`/api/common/hello`)
            .then(() => setIsServerAwake(true))
            .catch(() => setTimeout(pingServer, 500))
    }, [setIsServerAwake])

    useEffect(() => pingServer(), [pingServer])

    return <>
        {isVisible ?
            <div className="container">
                <h2 className="subtitle" style={{ marginTop: "2rem" }}>Connecting to the server...</h2>
                <progress className="progress is-small is-primary" max="100"></progress>
            </div>
            :
            <></>
        }
    </>
}

export default WaitOnWake