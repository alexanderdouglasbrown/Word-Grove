import React, { useState } from 'react'
import axios from 'axios'
import { withCookies } from 'react-cookie'
import { toast } from 'react-toastify'

const PostBox = ({ cookies, ...props }) => {
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

    const handleSubmit = e => {
        e.preventDefault()

        axios.post(`${process.env.REACT_APP_API_URL}/api/home/post`, { Post: inputText }, {
            headers: { Authorization: cookies.get('token') }
        })
            .then(() => {
                setInputText("")
                setCharacterCounter(maxCharacters)
                props.refreshPosts()
            })
            .catch(() => toast.error("Sorry, an error occurred"))
    }

    return (
        <div className="card" style={{margin: "1rem auto"}}>
            <div className="card-content">
                <form onSubmit={e => handleSubmit(e)}>
                    <textarea required onChange={e => handleInput(e)} className="textarea" placeholder="Put your words on Word Hole" value={inputText} />
                    <button type="submit" className="button is-primary" style={{ marginTop: "0.5rem" }}>Post</button>
                    <div style={{ float: "right", color: "lightgray" }} >Remaining characters: {characterCounter}</div>
                </form>
            </div>
        </div>
    )
}

export default withCookies(PostBox)