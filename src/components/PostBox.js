import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const PostBox = props => {
    const maxCharacters = 512

    const [inputText, setInputText] = useState("")
    const [characterCounter, setCharacterCounter] = useState(maxCharacters)

    const handleInput = e => {
        let text = e.target.value

        if (text.length > maxCharacters)
            text = text.substr(0, maxCharacters)

        setCharacterCounter(maxCharacters - text.length)
        setInputText(text)
    }

    const handlePost = () => {
        axios.post(`${process.env.REACT_APP_API_URL}/api/home/post`, { Post: inputText })
            .then(() => {
                setInputText("")
                setCharacterCounter(maxCharacters)
                props.refreshPosts()
            })
            .catch(() => toast.error("Sorry, an error occurred"))
    }

    return (
        <div className="card" style={{ margin: "1rem auto" }}>
            <div className="card-content">
                <textarea required onChange={handleInput} className="textarea" placeholder="Put your words on Word Hole" value={inputText} />
                <button onClick={handlePost} className="button is-primary" style={{ marginTop: "0.5rem" }}>Post</button>
                <div style={{ float: "right", color: "lightgray" }} >Remaining characters: {characterCounter}</div>
            </div>
        </div>
    )
}

export default PostBox