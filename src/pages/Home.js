import React, { useEffect, useState, useContext } from 'react'
import UserContext from '../UserContext'
import axios from 'axios'

import PostBox from '../components/PostBox'
// import Post from '../components/Post'

const Home = props => {
    // const [posts, setPosts] = useState(null)
    const [userData] = useContext(UserContext)
    const [sayHi, setSayHi] = useState(null) // Check if connection to server established

    const sendHello = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/home/hi`)
            .then(() => {
                setSayHi(true)
            })
            .catch(err => {
                setSayHi(false)
                // If an error occurred, it is likely because my free Heroku dyno hasn't spun up yet, so keep spamming until it does
                setTimeout(() => { sendHello() }, 1000)
            })
    }

    useEffect(() => {
        sendHello()
        // eslint-disable-next-line
    }, [])

    if (sayHi === null)
        return null

    return (<div className="container">
        {!sayHi ?
            <>
                <h2 className="subtitle" style={{ marginTop: "2rem" }}>Waking up the server...</h2>
                <progress className="progress is-small is-primary" max="100">15%</progress>
            </>
            :
            <>
                {userData.isLoggedIn ?
                    <div className="container">
                        <div className="card" style={{ padding: "1rem" }}>
                            <PostBox />
                        </div>
                    </div>
                    : null}
            </>
        }
    </div>)
}

export default Home