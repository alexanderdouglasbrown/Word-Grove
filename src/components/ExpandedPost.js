import React, { useContext, useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

import UserContext from '../UserContext'

import Post from '../components/Post'
import CommentPostBox from '../components/CommentPostBox'
import Comment from '../components/Comment'

const ExpandedPost = props => {
    const { postID, onPostDelete } = props
    const [userData] = useContext(UserContext)

    const [commentIDs, setCommentIDs] = useState(null)

    const refreshComments = useCallback(() => {
        if (postID === null)
            return

        axios.get(`${process.env.REACT_APP_API_URL}/api/comments/list`,
            { params: { PostID: postID } })
            .then(res => {
                setCommentIDs(res.data)
            })
            .catch(err => {
                if (err && err.response && err.response.data && err.response.data.error)
                    toast.error(err.response.data.error)
                else
                    toast.error("Sorry, an error occured")
            })
    }, [postID])

    useEffect(() => {
        if (!commentIDs)
            refreshComments()
    }, [commentIDs, refreshComments])

    return <div style={{overflowX: "hidden"}}>
        <Post
            postID={postID}
            isExpanded
            onDelete={onPostDelete}
        />
        {userData.isLoggedIn &&
            <CommentPostBox
                postID={postID}
                refreshComments={refreshComments}
            />}
        {commentIDs && commentIDs.length > 0 &&
            <div style={{ width: "40rem", margin: "1rem auto", fontWeight: 600, color: "gray", paddingLeft: "2rem" }} >Comments</div>
        }
        {commentIDs &&
            commentIDs.map(commentID => <Comment
                key={commentID}
                commentID={commentID}
                refreshComments={refreshComments}
            />)
        }
    </div>
}

export default ExpandedPost