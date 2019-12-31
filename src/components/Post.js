import React, { useState, useEffect, useCallback, useContext } from 'react'
import Linkify from 'react-linkify'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

import Like from '../components/Like'

import UserContext from '../UserContext'

import '../components/css/LinkButton.css'

const Post = props => {
    const maxCharacters = 512

    const [userData] = useContext(UserContext)

    const { postID, isExpanded } = props
    const [postData, setPostData] = useState(null)

    const [isEditMode, setIsEditMode] = useState(false)
    const [editInput, setEditInput] = useState("")
    const [characterCounter, setCharacterCounter] = useState(maxCharacters)

    const [isPostDeleted, setIsPostDeleted] = useState(false)

    const expandPostClicked = e => {
        if (e.target && e.target.tagName && e.target.tagName.toLowerCase() !== "a")
            props.expandPost(postID)
    }

    const refreshPost = useCallback(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/post`,
            { params: { ID: postID } })
            .then(res => {
                setPostData(res.data)
            })
            .catch(err => {
                if (err && err.response && err.response.data && err.response.data.error)
                    toast.error(err.response.data.error)
                else
                    toast.error("Sorry, an error occured")
            })
    }, [postID])

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
        if (!postData && !isPostDeleted)
            refreshPost()
    }, [refreshPost, postData, isPostDeleted])

    const deletePost = () => {
        if (window.confirm("Are you sure you would like to delete this post?")) {
            axios.delete(`${process.env.REACT_APP_API_URL}/api/post`,
                { data: { ID: postID }, headers: { Authorization: userData.token } })
                .then(() => {
                    setIsPostDeleted(true)
                    setPostData(null)
                })
                .catch(err => {
                    if (err && err.response && err.response.data && err.response.data.error)
                        toast.error(err.response.data.error)
                    else
                        toast.error("Sorry, an error occured")
                })
        }
    }

    const saveEdit = () => {
        axios.patch(`${process.env.REACT_APP_API_URL}/api/post`,
            { ID: postID, Post: editInput }, { headers: { Authorization: userData.token } })
            .then(() => {
                refreshPost()
                cancelEdit()
                refreshPost()
            })
            .catch(err => {
                if (err && err.response && err.response.data && err.response.data.error)
                    toast.error(err.response.data.error)
                else
                    toast.error("Sorry, an error occured")
            })
    }

    return <>
        {postData ?
            <div className="card" style={{ margin: "1rem auto" }}>
                <div className="card-content">
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
                    {isEditMode ?
                        <>
                            <div className="LinkButton-Danger" onClick={deletePost} style={{ position: "absolute", top: "0.25rem", left: "0.25rem", fontSize: "0.7rem" }}>Delete</div>
                            <textarea onChange={handleInput} value={editInput} className="textarea" />
                            <div style={{ float: "right", color: "lightgray" }} >Remaining characters: {characterCounter}</div>
                        </>
                        :
                        <>
                            {isExpanded ?
                                <Linkify>{postData.post}</Linkify>
                                :
                                <div style={{ whiteSpace: "pre-wrap", cursor: "pointer" }} onClick={expandPostClicked}>
                                    <Linkify>{postData.post}</Linkify>
                                </div>
                            }
                        </>
                    }
                </div>
                <div className="card-footer" style={{ justifyContent: "space-between", fontSize: "0.7rem", color: "gray", padding: "1rem" }}>
                    <div>
                        <div style={{ display: "inline-block" }}>Posted by&nbsp;</div>
                        <div style={{ display: "inline-block" }} className="LinkButton"><Link to={`/p/${postData.username}`}>{`${postData.username}`}</Link></div>
                    </div>

                    <Like />
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