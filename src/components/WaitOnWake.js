import React, { useEffect } from 'react'
import axios from 'axios'

const WaitOnWake = props => {
    const { setIsServerAwake } = props

    useEffect(() => pingServer(), [])

    const pingServer = () => {
        axios.get(`/api/common/hello`)
            .then(() => setIsServerAwake(true))
            .catch(() => setTimeout(pingServer, 500))
    }

    return <div className="container">
        <h2 className="subtitle" style={{ marginTop: "2rem" }}>Waking up the server...</h2>
        <progress className="progress is-small is-primary" max="100"></progress>
    </div>
}

export default WaitOnWake