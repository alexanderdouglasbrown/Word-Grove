import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import noScroll from 'no-scroll'

import Post from '../components/Post'
import PostModal from '../components/PostModal'

const Profile = props => {
    const { username } = useParams()
    const [profileData, setProfileData] = useState(null)
    const [postIDs, setPostIDs] = useState(null)

    const [isPostModalVisible, setIsPostModalVisible] = useState(false)
    const [selectedPostID, setSelectedPostID] = useState(null)
    const [refreshIndex, setRefreshIndex] = useState(null)

    const refreshPosts = useCallback(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/profile/posts`,
            { params: { UserID: profileData.userID } })
            .then(res => setPostIDs(res.data))
            .catch(err => {
                if (err && err.response && err.response.data && err.response.data.error)
                    toast.error(err.response.data.error)
                else
                    toast.error("Sorry, an error occured")
            })
    }, [profileData])

    const closePostModal = () => {
        setIsPostModalVisible(false)
        setRefreshIndex(selectedPostID)
        setSelectedPostID(null)
        window.history.replaceState(null, null, `/p/${username}`)
    }

    const openPostModal = postID => {
        setSelectedPostID(postID)
        setIsPostModalVisible(true)
        window.history.replaceState(null, null, `/wh/${postID}`)
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/profile/user`,
            { params: { Username: username } })
            .then(res => setProfileData(res.data))
            .catch(err => {
                if (err && err.response && err.response.data && err.response.data.error)
                    toast.error(err.response.data.error)
                else
                    toast.error("Sorry, an error occured")
            })
    }, [username])

    useEffect(() => {
        if (profileData) {
            refreshPosts()
        }
    }, [profileData, refreshPosts])

    useEffect(() => {
        if (isPostModalVisible)
            noScroll.on()
        else
            noScroll.off()
            
        return () => noScroll.off()
    }, [isPostModalVisible])

    return <>
        <div className="container">
            {profileData &&
                <>
                    <h5 style={{ textAlign: "center" }} className="title">{`${profileData.username}'s Posts`}</h5>
                    <>
                        {profileData.access !== "User" &&
                            <h5 style={{ textAlign: "center" }} className="subtitle">{profileData.access}</h5>
                        }
                    </>
                </>
            }
            {postIDs &&
                postIDs.map(postID => <Post
                    key={postID}
                    postID={postID}
                    expandPost={openPostModal}
                    refreshIndex={refreshIndex}
                    setRefreshIndex={setRefreshIndex}
                    isProfile
                />)
            }
        </div>
        <PostModal
            isOpen={isPostModalVisible}
            closeModal={closePostModal}
            postID={selectedPostID}
            refresh={refreshPosts}
        />
    </>
}

export default Profile