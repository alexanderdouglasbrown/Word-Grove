import React, { useContext } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { toast } from 'react-toastify'

import UserContext from '../UserContext'

const Likes = props => {
    const [userData] = useContext(UserContext)
    const { postID, totalLikes, isUserLiked, refresh } = props

    const toggleLike = () => {
        if (!userData.isLoggedIn) {
            toast.info("Please log in to Like posts")
            return
        }

        if (isUserLiked)
            deleteLike()
        else
            addLike()
    }

    const deleteLike = () => {
        axios.delete(`${process.env.REACT_APP_API_URL}/api/likes`,
            { data: { PostID: postID } })
            .then(() => {
                refresh()
            })
            .catch(() => toast.error("Sorry, something went wrong"))
    }

    const addLike = () => {
        axios.put(`${process.env.REACT_APP_API_URL}/api/likes`, { PostID: postID })
            .then(() => {
                refresh()
            })
            .catch(() => toast.error("Sorry, something went wrong"))
    }

    return <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "1.5rem" }}>
        <FontAwesomeIcon style={{ marginTop: "0.15rem", color: "fuchsia", cursor: "pointer" }} icon={isUserLiked ? faSolidHeart : faHeart} onClick={toggleLike} />
        <div style={{ marginLeft: "0.25rem", fontWeight: 600 }}>{`${totalLikes ? `(${totalLikes})` : ""}`}</div>
    </div>
}

export default Likes