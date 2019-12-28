import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

// import UserContext from '../UserContext'

const ExpandedPost = props => {
    // const [userData] = useContext(UserContext)
    const [postData, setPostData] = useState(null)
    const [, setCommentsData] = useState(null)

    const postID = props.id

    const refreshPost = useCallback(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/post`,
            { params: { ID: postID } })
            .then(res => {
                setPostData(res.data.post)
                setCommentsData(res.data.comments)
            })
            .catch(() => toast.error("Sorry, something went wrong"))
    }, [postID])

    useEffect(() => {
        if (postID) {
            refreshPost()
        } else {
            setPostData(null)
            setCommentsData(null)
        }
    }, [postID, refreshPost])

    return <>
        {postData ?
            <div className="card" style={{ fontSize: "1.2rem", padding: "1rem", marginTop: 0, marginBottom: "0.75rem", whiteSpace: "pre-wrap" }}>
                {postData.post}
            </div>
            :
            null
        }
    </>
}

export default ExpandedPost