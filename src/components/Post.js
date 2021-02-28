import React, { useState, useEffect, useCallback, useContext } from 'react'
import Linkify from 'react-linkify'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Like from '../components/Like'

import useStandardError from '../hooks/useStandardError'

import UserContext from '../UserContext'

import '../components/css/LinkButton.css'

const Post = props => {
    const maxCharacters = 512

    const standardError = useStandardError()
    const [userData] = useContext(UserContext)

    const { postID, isExpanded, isProfile, expandPost, refreshIndex, setRefreshIndex } = props
    const [postData, setPostData] = useState(null)

    const [totalLikes, setTotalLikes] = useState(null)
    const [isUserLiked, setIsUserLiked] = useState(null)
    const [totalComments, setTotalComments] = useState(null)

    const [isEditMode, setIsEditMode] = useState(false)
    const [editInput, setEditInput] = useState("")
    const [characterCounter, setCharacterCounter] = useState(maxCharacters)

    const [isPostDeleted, setIsPostDeleted] = useState(false)

    const expandPostClicked = e => {
        if (isEditMode || isExpanded)
            return

        if (e.target && e.target.tagName && e.target.tagName.toLowerCase() !== "a")
            expandPost(postID)
    }

    const refreshPost = useCallback((forcedRefresh) => {
        if (postID === null)
            return

        axios.get(`/api/post`,
            { params: { ID: postID } })
            .then(res => {
                setPostData(res.data.post)
                setTotalLikes(res.data.totalLikes)
                setTotalComments(res.data.totalComments)
                setIsUserLiked(res.data.isUserLiked)
            })
            .catch(standardError)
    }, [postID, standardError])

    const handleInput = e => {
        let text = e.target.value

        if (text.length > maxCharacters)
            text = text.substr(0, maxCharacters)

        setCharacterCounter(maxCharacters - text.length)
        setEditInput(text)
    }

    const startEdit = () => {
        const text = postData && postData.post ? postData.post : ""
        setEditInput(text)
        setIsEditMode(true)
        setCharacterCounter(maxCharacters - text.length)
    }

    const cancelEdit = () => {
        setEditInput("")
        setIsEditMode(false)
        setCharacterCounter(maxCharacters)
    }

    useEffect(() => {
        if (!postData && !isPostDeleted && postID !== null)
            refreshPost()
    }, [refreshPost, postData, isPostDeleted, postID])

    useEffect(() => {
        if (!isPostDeleted && refreshIndex === postID) {
            refreshPost(true)
            setRefreshIndex(null)
        }
    }, [refreshIndex, postID, refreshPost, setRefreshIndex, isPostDeleted])

    const deletePost = () => {
        if (window.confirm("Are you sure you would like to delete this post?")) {
            axios.delete(`/api/post`,
                { data: { ID: postID } })
                .then(() => {
                    setIsPostDeleted(true)
                    setPostData(null)

                    if (props.onDelete)
                        props.onDelete()
                })
                .catch(standardError)
        }
    }

    const saveEdit = () => {
        axios.patch(`/api/post`,
            { ID: postID, Post: editInput })
            .then(() => {
                cancelEdit()
                refreshPost()

                if (props.onEdit)
                    props.onEdit()
            })
            .catch(standardError)
    }

    return <>
        {postData ?
            <div className="card" style={{ margin: "1rem auto", overflowX: "auto" }}>
                {(userData.userID === postData.userID || userData.access === "Admin") &&
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
                <div className="card-content" style={{ cursor: `${isExpanded || isEditMode ? "auto" : "pointer"}` }} onClick={expandPostClicked}>
                    {isEditMode ?
                        <>
                            <div className="LinkButton-Danger" onClick={deletePost} style={{ position: "absolute", top: "0.25rem", left: "0.25rem", fontSize: "0.7rem" }}>Delete</div>
                            <textarea onChange={handleInput} value={editInput} className="textarea" />
                            <div style={{ float: "right", color: "lightgray" }} >Remaining characters: {characterCounter}</div>
                        </>
                        :
                        <>
                            {isExpanded ?
                                <div style={{ whiteSpace: "pre-wrap" }}>
                                    <Linkify>{postData.post}</Linkify>
                                </div>
                                :
                                <div style={{ whiteSpace: "pre-wrap" }}>
                                    <Linkify>{postData.post}</Linkify>
                                </div>
                            }
                        </>
                    }
                </div>
                <div className="card-footer" style={{ justifyContent: "space-between", fontSize: "0.7rem", color: "gray", padding: "1rem" }}>
                    <div>
                        <div>{`${postData.date}${postData.isEdited ? " (Edited)" : ""}`}</div>
                        {isProfile ?
                            <div>{`${postData.username}`}</div>
                            :
                            <div className="LinkButton"><Link to={`/p/${postData.username}`}>{`${postData.username}`}</Link></div>
                        }
                    </div>

                    <div>
                        <Like
                            postID={postID}
                            totalLikes={totalLikes}
                            isUserLiked={isUserLiked}
                            refresh={refreshPost}
                        />
                        {!isExpanded &&
                            <div className="LinkButton" style={{ width: "5.5rem" }} onClick={expandPostClicked}>{`Comments${totalComments && totalComments > 0 ? ` (${totalComments})` : ""}`}</div>
                        }
                    </div>
                </div>
            </div>
            :
            <>
                {isPostDeleted ?
                    null
                    :
                    <div className="card" style={{ margin: "1rem auto" }}>
                        <div className="card-content">
                            <progress className="progress is-small is-light" max="100"></progress>
                        </div>
                    </div>
                }
            </>

        }
    </>
}

export default Post