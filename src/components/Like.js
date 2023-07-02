import React, { useContext } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { toast } from 'react-toastify'

import useStandardError from '../hooks/useStandardError'

import UserContext from '../UserContext'

const Likes = props => {
    const [userData] = useContext(UserContext)
    const { postID, totalLikes, isUserLiked, refresh } = props
    const standardError = useStandardError()

    const toggleLike = () => {
        if (!userData.isLoggedIn) {
            toast.info("Please log in to like posts")
            return
        }

        if (isUserLiked)
            deleteLike()
        else
            addLike()
    }

    const deleteLike = () => {
        axios.delete(`/api/likes`,
            { data: { PostID: postID } })
            .then(() => {
                refresh()
            })
            .catch(standardError)
    }

    const addLike = () => {
        axios.put(`/api/likes`, { PostID: postID })
            .then(() => {
                refresh()
            })
            .catch(standardError)
    }

    return <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "1.5rem" }}>
        <FontAwesomeIcon style={{ marginTop: "0.15rem", color: "fuchsia", cursor: "pointer" }} icon={isUserLiked ? faSolidHeart : faHeart} onClick={toggleLike} />
        <div style={{ marginLeft: "0.25rem", fontWeight: 600 }}>{`${totalLikes ? `(${totalLikes})` : ""}`}</div>
    </div>
}

export default Likes