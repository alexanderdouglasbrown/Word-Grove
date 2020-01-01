import React, { useState, useCallback, useEffect, useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import UserContext from '../UserContext'

const Comment = props => {
    const { commentID, refreshComments } = props
    const [userData] = useContext(UserContext)

    const [commentData, setCommentData] = useState(null)

    const [isEditMode, setIsEditMode] = useState(false)
    const [editInput, setEditInput] = useState("")

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

    const cancelEdit = () => {
        setIsEditMode(false)
        setEditInput("")
    }

    const saveEdit = () => {
        axios.patch(`${process.env.REACT_APP_API_URL}/api/comments`,
            { CommentID: commentID, Comment: editInput }, { headers: { Authorization: userData.token } })
            .then(() => {
                refreshComment()
                cancelEdit()
            })
            .catch(err => {
                if (err && err.response && err.response.data && err.response.data.error)
                    toast.error(err.response.data.error)
                else
                    toast.error("Sorry, an error occured")
            })
    }

    const startEdit = () => {
        const text = commentData && (commentData.comment ?? "")
        setEditInput(text)
        setIsEditMode(true)
    }

    const deleteComment = () => {
        if (window.confirm("Are you sure you would like to delete this comment?")) {
            axios.delete(`${process.env.REACT_APP_API_URL}/api/comments`,
                { data: { CommentID: commentID }, headers: { Authorization: userData.token } })
                .then(() => {
                    refreshComments()
                })
                .catch(err => {
                    if (err && err.response && err.response.data && err.response.data.error)
                        toast.error(err.response.data.error)
                    else
                        toast.error("Sorry, an error occured")
                })
        }
    }

    useEffect(() => {
        if (!commentData)
            refreshComment()
    }, [commentData, refreshComment])

    return <>
        {commentData ?
            <div className="card" style={{ margin: "1rem auto" }}>
                {(userData.userID === commentData.userID || userData.access === "Admin") &&
                    <div style={{ position: "absolute", top: "0.25rem", right: "0.25rem", fontSize: "0.7rem" }}>
                        {isEditMode ?
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div className="LinkButton" onClick={cancelEdit}>Cancel</div>
                                <div style={{ width: "0.5rem" }}></div>
                                <div className="LinkButton" onClick={saveEdit} style={{ fontWeight: 700 }}>Save</div>
                            </div>
                            :
                            <div className="LinkButton" onClick={startEdit}>Edit</div>
                        }
                    </div>
                }
                <div className="card-content">
                    <div style={{ whiteSpace: "pre-wrap" }}>
                        {isEditMode ?
                            <>
                                <div className="LinkButton-Danger" onClick={deleteComment} style={{ position: "absolute", top: "0.25rem", left: "0.25rem", fontSize: "0.7rem" }}>Delete</div>
                                <textarea onChange={e => setEditInput(e.target.value)} value={editInput} className="textarea" />
                            </>
                            :
                            <>
                                {`${commentData.comment}`}
                            </>
                        }

                    </div>
                </div>
                <div className="card-footer" style={{ justifyContent: "space-between", fontSize: "0.7rem", color: "gray", padding: "1rem" }}>
                    <div>
                        <div>{`${commentData.date}${commentData.isEdited ? " (Edited)" : ""}`}</div>
                        <div className="LinkButton"><Link to={`/p/${commentData.username}`}>{`${commentData.username}`}</Link></div>
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