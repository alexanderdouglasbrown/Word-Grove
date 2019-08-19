import React, { useEffect, useState, useContext } from 'react'
import UserContext from '../UserContext'
import axios from 'axios'

// import Post from '../components/Post'

const Home = props => {
    // const [posts, setPosts] = useState(null)
    const [userData] = useContext(UserContext)
    const [sayHi, setSayHi] = useState(false) // Check if connection to server established

    const sendHello = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/home/hi`)
            .then(() => {
                setSayHi(true)
            })
            .catch(err => {
                // If an error occurred, it is likely because my free Heroku dyno hasn't spun up yet, so keep spamming until it does
                setTimeout(() => { sendHello() }, 1000)
            })
    }

    useEffect(() => {
        sendHello()
        // eslint-disable-next-line
    }, [])

    return (<div className="container">
        {!sayHi ?
            <>
                <h2 className="subtitle" style={{ marginTop: "2rem" }}>Waking up the server...</h2>
                <progress className="progress is-small is-primary" max="100">15%</progress>
            </>
            :
            <>CONNECTION ESTABLSIHED. Hi</>
        }
    </div>)
}

export default Home