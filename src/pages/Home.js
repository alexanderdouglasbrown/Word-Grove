import React, { useEffect, useState, useContext, useCallback } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

import UserContext from '../UserContext'

import PostBox from '../components/PostBox'
import Post from '../components/Post'
import PostModal from '../components/PostModal'

const Home = props => {
    const [userData] = useContext(UserContext)
    const [sayHi, setSayHi] = useState(null) // Check if connection to server established

    const [postData, setPostData] = useState([])

    const [isPostModalVisible, setIsPostModalVisible] = useState(false)
    const [selectedPostID, setSelectedPostID] = useState(null)

    const closePostModal = () => {
        setIsPostModalVisible(false)
        setSelectedPostID(null)
    }

    const openPostModal = postID => {
        setSelectedPostID(postID)
        setIsPostModalVisible(true)
    }

    const sendHello = useCallback(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/home/hi`)
            .then(() => {
                setSayHi(true)
            })
            .catch(() => {
                setSayHi(false)
                // If an error occurred, it is likely because my free Heroku dyno hasn't spun up yet, so keep spamming until it does
                setTimeout(() => { sendHello() }, 1000)
            })
    }, [])

    const refreshPosts = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/home/posts`)
            .then(res => setPostData(res.data))
            .catch(() => toast.error("Sorry, something went wrong"))
    }

    useEffect(() => {
        sendHello()
    }, [sendHello])

    useEffect(() => {
        if (sayHi) {
            refreshPosts()
        }
    }, [sayHi])

    return <>
        {sayHi ?
            <>
                <div className="container">
                    <>
                        {userData.isLoggedIn ?
                            <PostBox refreshPosts={refreshPosts} />
                            : null}
                        {postData.map(postData => <Post key={postData.id} postData={postData} expandPost={openPostModal} />)}
                    </>
                </div>
                <PostModal
                    isOpen={isPostModalVisible}
                    closeModal={closePostModal}
                    postID={selectedPostID}
                />
            </>
            :
            <>
                {sayHi === false ?
                    <div className="container">
                        <h2 className="subtitle" style={{ marginTop: "2rem" }}>Waking up the server...</h2>
                        <progress className="progress is-small is-primary" max="100"></progress>
                    </div>
                    :
                    null
                }
            </>
        }
    </>
}

export default Home