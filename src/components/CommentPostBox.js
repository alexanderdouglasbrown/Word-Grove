import React, { useState, useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

import UserContext from '../UserContext'

const CommentPostBox = props => {
    const { postID, refreshComments } = props
    const [userData] = useContext(UserContext)

    const [inputText, setInputText] = useState("")

    const handlePost = () => {
        axios.post(`${process.env.REACT_APP_API_URL}/api/comments`,
            { Comment: inputText, PostID: postID },
            {
                headers: { Authorization: userData.token }
            })
            .then(() => {
                setInputText("")
                refreshComments()
            })
            .catch(err => {
                if (err && err.response && err.response.data && err.response.data.error)
                    toast.error(err.response.data.error)
                else
                    toast.error("Sorry, an error occured")
            })
    }

    return <div className="card" style={{ margin: "1rem auto" }}>
        <div className="card-content">
            <textarea required className="textarea" value={inputText} onChange={e => setInputText(e.target.value)} placeholder="Comment on this post" />
            <button onClick={handlePost} className="button is-primary" style={{ marginTop: "0.5rem" }}>Comment</button>
        </div>
    </div>
}

export default CommentPostBox