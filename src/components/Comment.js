import React, { useState, useCallback, useEffect, /*useContext*/ } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { toast } from 'react-toastify'

// import UserContext from '../UserContext'

const Comment = props => {
    const { commentID } = props
    // const [userData] = useContext(UserContext)

    const [commentData, setCommentData] = useState(null)

    const refreshComment = useCallback(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/comments`,
            { params: { CommentID: commentID } })
            .then(res => {
                setCommentData(res.data)
            })
            .catch(err => {
                if (err && err.response && err.response.data && err.response.data.error)
                    toast.error(err.response.data.error)
                else
                    toast.error("Sorry, an error occured")
            })
    }, [commentID])

    useEffect(() => {
        if (!commentData)
            refreshComment()
    }, [commentData, refreshComment])

    return <>
        {commentData ?
            <div className="card" style={{ margin: "1rem auto" }}>
                <div className="card-content">
                    <div style={{ whiteSpace: "pre-wrap" }}>
                        {`${commentData.comment}`}
                    </div>
                </div>
                <div className="card-footer" style={{ justifyContent: "space-between", fontSize: "0.7rem", color: "gray", padding: "1rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div className="LinkButton"><Link to={`/p/${commentData.username}`}>{`${commentData.username}`}</Link></div>
                        <div>{`, ${commentData.date}${commentData.isEdited ? " (Edited)" : ""}`}</div>
                    </div>
                </div>
            </div>
            :
            <div className="card" style={{ margin: "1rem auto" }}>
                <div className="card-content">
                    <progress className="progress is-small is-light" max="100"></progress>
                </div>
            </div>
        }
    </>
}

export default Comment