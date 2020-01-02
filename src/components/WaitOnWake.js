import React, { useState, useEffect } from 'react'

const WaitOnWake = props => {
    const [oneSecLater, setOneSecLater] = useState(false)

    useEffect(() => {
        if (!oneSecLater)
            setTimeout(() => setOneSecLater(true), 1000)
    }, [oneSecLater])

    return <>
        {oneSecLater ?
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