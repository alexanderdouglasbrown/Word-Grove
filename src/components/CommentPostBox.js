import React, { useState } from 'react'
import axios from 'axios'

import useStandardError from '../hooks/useStandardError'

const CommentPostBox = props => {
    const { postID, refreshComments } = props
    const standardError = useStandardError()

    const [inputText, setInputText] = useState("")

    const handlePost = () => {
        if (inputText && postID)
            axios.post(`/api/comments`,
                { Comment: String(inputText), PostID: Number(postID) })
                .then(() => {
                    setInputText("")
                    refreshComments()
                })
                .catch(standardError)
    }

    return <div className="card" style={{ margin: "1rem auto" }}>
        <div className="card-content">
            <textarea required className="textarea" value={inputText} onChange={e => setInputText(e.target.value)} placeholder="Comment on this post" />
            <button disabled={!inputText} onClick={handlePost} className="button is-primary" style={{ marginTop: "0.5rem" }}>Comment</button>
        </div>
    </div>
}

export default CommentPostBox