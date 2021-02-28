import React, { useEffect, useState, useContext, useCallback, useRef } from 'react'
import axios from 'axios'
import noScroll from 'no-scroll'

import useStandardError from '../hooks/useStandardError'

import UserContext from '../UserContext'

import PostBox from '../components/PostBox'
import Post from '../components/Post'
import PostModal from '../components/PostModal'

const Home = props => {
    const [userData] = useContext(UserContext)
    const standardError = useStandardError()

    const [postIDs, setPostIDs] = useState(null)

    const [isPostModalVisible, setIsPostModalVisible] = useState(false)
    const [selectedPostID, setSelectedPostID] = useState(null)
    const [refreshIndex, setRefreshIndex] = useState(null)

    const getPostIDs = useRef()
    const isFetching = useRef(false)
    getPostIDs.current = () => { return postIDs }

    const refreshPosts = useCallback(() => {
        axios.get(`/api/home/posts`,
            { params: { LastID: null } })
            .then(res => setPostIDs(res.data))
            .catch(standardError)
    }, [standardError])

    const getMorePosts = useCallback(() => {
        const posts = getPostIDs.current()

        if (!posts || posts.length < 1)
            return

        const lastID = posts[posts.length - 1]

        if (lastID <= 1)
            return

        isFetching.current = true
        axios.get(`/api/home/posts`,
            { params: { lastID } })
            .then(res => setPostIDs([...postIDs, ...res.data]))
            .catch(standardError)
            .finally(() => isFetching.current = false)
    }, [postIDs, standardError])

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

    const handleScroll = useCallback(e => {
        if (!isFetching.current && window.innerHeight + document.documentElement.scrollTop + 200 >= document.documentElement.offsetHeight)
            getMorePosts()
    }, [getMorePosts])

    useEffect(() => {
        if (!postIDs)
            refreshPosts()
    }, [postIDs, refreshPosts])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [handleScroll])

    useEffect(() => { // Trigger infinite scroll if not enough height for a scrollbar
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
        <div className="container">
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
        </div>
        <PostModal
            isOpen={isPostModalVisible}
            closeModal={closePostModal}
            postID={selectedPostID}
        />
    </>
}

export default Home