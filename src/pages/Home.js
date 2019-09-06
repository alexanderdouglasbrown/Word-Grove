import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

import UserContext from '../UserContext'

import PostBox from '../components/PostBox'
import Post from '../components/Post'

const Home = props => {
    // const [posts, setPosts] = useState(null)
    const [userData] = useContext(UserContext)
    const [sayHi, setSayHi] = useState(null) // Check if connection to server established

    const [posts, setPosts] = useState([])

    const sendHello = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/home/hi`)
            .then(() => {
                setSayHi(true)
            })
            .catch(() => {
                setSayHi(false)
                // If an error occurred, it is likely because my free Heroku dyno hasn't spun up yet, so keep spamming until it does
                setTimeout(() => { sendHello() }, 1000)
            })
    }

    useEffect(() => {
        sendHello()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (sayHi) {
            loadPosts()
        }
    }, [sayHi])

    const loadPosts = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/home/posts`)
        .then(res => {
            setPosts(res.data)
        })
        .catch(() => toast.error("Sorry, something went wrong"))
    }

    if (sayHi === null)
        return null

    return (<div className="container">
        {!sayHi ?
            <>
                <h2 className="subtitle" style={{ marginTop: "2rem" }}>Waking up the server...</h2>
                <progress className="progress is-small is-primary" max="100"></progress>
            </>
            :
            <>
                {userData.isLoggedIn ?
                            <PostBox loadPosts={loadPosts} />
                    : null}
                    {posts.map(post=><Post key={post.id} post={post.post} />)}
            </>
        }
    </div>)
}

export default Home