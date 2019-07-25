import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Post from '../components/Post'

const Home = props => {
    const [posts, setPosts] = useState(null)

    const getHomeFeed = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/home`)
            .then((res) => {
                setPosts(res.data)
            })
            .catch((err) => {
                // If an error occurred, it is likely because my free Heroku dyno hasn't spun up yet, so keep spamming until it does
                console.log("Trying again. The API server may not be awake yet.")
                setTimeout(() => { getHomeFeed() }, 1000)
            })
    }

    useEffect(() => {
        getHomeFeed()
        // eslint-disable-next-line
    }, [])

    return (<div className="container">
        {
            posts ?
                posts.map(post => <Post data={post} />)
                :
                <>
                    <h2 class="subtitle" style={{marginTop: "2rem"}}>Waking up the server...</h2>
                    <progress class="progress is-small is-primary" max="100">15%</progress>
                </>
        }
    </div>)
}

export default Home