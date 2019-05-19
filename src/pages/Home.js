import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Home = props => {
    const [posts, setPosts] = useState(null)

    const getHomeFeed = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/hole`)
            .then((res) => {
                setPosts(res.data)
            })
            .catch((error) => {
                // If an error occurred, it is likely because my free Heroku dyno hasn't spun up yet, so keep spamming until it does
                console.log("Trying again. The API server may not be awake yet.")
                setTimeout(() => { getHomeFeed() }, 1000)
            })
    }

    useEffect(() => {
        getHomeFeed()
    }, [])

    return (<>
        {
            posts ?
                posts.map(post=><div>{post}</div>)
                :
                null
        }
    </>)
}

export default Home