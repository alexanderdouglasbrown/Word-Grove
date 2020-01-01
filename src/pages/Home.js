import React, { useEffect, useState, useContext, useCallback, useRef } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import noScroll from 'no-scroll'

import UserContext from '../UserContext'

import PostBox from '../components/PostBox'
import Post from '../components/Post'
import PostModal from '../components/PostModal'

const Home = props => {
    const [userData] = useContext(UserContext)
    const [sayHi, setSayHi] = useState(null) // Check if connection to server established

    const [postIDs, setPostIDs] = useState(null)

    const [isPostModalVisible, setIsPostModalVisible] = useState(false)
    const [selectedPostID, setSelectedPostID] = useState(null)
    const [refreshIndex, setRefreshIndex] = useState(null)

    const getPostIDs = useRef()
    const isFetching = useRef(false)
    getPostIDs.current = () => { return postIDs }

    const refreshPosts = useCallback(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/home/posts`,
            { params: { LastID: null } })
            .then(res => setPostIDs(res.data))
            .catch(() => toast.error("Sorry, something went wrong"))
    }, [])

    const getMorePosts = useCallback(() => {
        const posts = getPostIDs.current()

        if (!posts || posts.length < 1)
            return

        const lastID = posts[posts.length - 1]

        if (lastID <= 1)
            return

        isFetching.current = true
        axios.get(`${process.env.REACT_APP_API_URL}/api/home/posts`,
            { params: { lastID } })
            .then(res => setPostIDs([...postIDs, ...res.data]))
            .catch(() => toast.error("Sorry, something went wrong"))
            .finally(() => isFetching.current = false)
    }, [postIDs])

    const closePostModal = () => {
        setIsPostModalVisible(false)
        setRefreshIndex(selectedPostID)
        setSelectedPostID(null)
        window.history.pushState(null, null, '/')
    }

    const openPostModal = postID => {
        setSelectedPostID(postID)
        setIsPostModalVisible(true)
        window.history.pushState(null, null, `/wh/${postID}`)
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

    const handleScroll = useCallback(e => {
        if (!isFetching.current && window.innerHeight + document.documentElement.scrollTop + 200 >= document.documentElement.offsetHeight)
            getMorePosts()
    }, [getMorePosts])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [handleScroll])

    useEffect(() => {
        if (!sayHi) {
            sendHello()
        } else if (!postIDs) {
            refreshPosts()
        }
    }, [sendHello, sayHi, refreshPosts, postIDs])

    useEffect(() => { // Trigger infinite scroll if non enough height for a scrollbar
        if (postIDs && postIDs.length > 0 && window.innerHeight > document.documentElement.offsetHeight)
            handleScroll()
    }, [postIDs, handleScroll])

    useEffect(() => {
        if (isPostModalVisible)
            noScroll.on()
        else
            noScroll.off()
            
        return () => noScroll.off()
    }, [isPostModalVisible])

    return <>
        {sayHi ?
            <>
                <div className="container">
                    <>
                        {userData.isLoggedIn &&
                            <PostBox refreshPosts={refreshPosts} />
                        }
                        {postIDs &&
                            postIDs.map(postID => <Post
                                key={postID}
                                postID={postID}
                                expandPost={openPostModal}
                                refreshIndex={refreshIndex}
                                setRefreshIndex={setRefreshIndex}
                            />)
                        }
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