import React, { useState, useCallback, useEffect, useContext } from 'react'
import axios from 'axios'
import Linkify from 'react-linkify'
import { Link } from 'react-router-dom'

import useStandardError from '../hooks/useStandardError'

import UserContext from '../UserContext'

const Comment = props => {
    const { commentID, refreshComments } = props
    const [userData] = useContext(UserContext)
    const standardError = useStandardError()

    const [commentData, setCommentData] = useState(null)

    const [isEditMode, setIsEditMode] = useState(false)
    const [editInput, setEditInput] = useState("")

    const refreshComment = useCallback(() => {
        axios.get(`/api/comments`,
            { params: { CommentID: commentID } })
            .then(res => {
                setCommentData(res.data)
            })
            .catch(standardError)
    }, [commentID, standardError])

    const cancelEdit = () => {
        setIsEditMode(false)
        setEditInput("")
    }

    const saveEdit = () => {
        axios.patch(`/api/comments`,
            { CommentID: commentID, Comment: editInput })
            .then(() => {
                refreshComment()
                cancelEdit()
            })
            .catch(standardError)
    }

    const startEdit = () => {
        const text = commentData && (commentData.comment ?? "")
        setEditInput(text)
        setIsEditMode(true)
    }

    const deleteComment = () => {
        if (window.confirm("Are you sure you would like to delete this comment?")) {
            axios.delete(`/api/comments`,
                { data: { CommentID: commentID } })
                .then(() => {
                    refreshComments()
                })
                .catch(standardError)
        }
    }

    useEffect(() => {
        if (!commentData)
            refreshComment()
    }, [commentData, refreshComment])

    return <>
        {commentData ?
            <div className="card" style={{ margin: "1rem auto", overflowX: "auto" }}>
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
                            <Linkify>
                                {`${commentData.comment}`}
                            </Linkify>
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