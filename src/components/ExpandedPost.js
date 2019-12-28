import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Linkify from 'react-linkify'

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
            .catch(err => {
                if (err && err.response && err.response.data && err.response.data.error)
                    toast.error(err.response.data.error)
                else
                    toast.error("Sorry, an error occured")
            })
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
            <div className="card" style={{ margin: "1rem auto" }}>
                <div className="card-content" style={{ whiteSpace: "pre-wrap" }}>
                    <Linkify>{postData.post}</Linkify>
                </div>
                <div className="card-footer" style={{ justifyContent: "space-between", fontSize: "0.7rem", color: "gray", padding: "1rem" }}>
                    <div>
                        {`${postData.username}, ${postData.date}`}
                    </div>
                    <div className="LinkButton">¯\_(ツ)_/¯</div>
                </div>
            </div>
            :
            null
        }
    </>
}

export default ExpandedPost