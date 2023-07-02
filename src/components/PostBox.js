import React, { useState } from 'react'
import axios from 'axios'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-regular-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import useStandardError from '../hooks/useStandardError'

const PostBox = props => {
    const maxCharacters = 512

    const standardError = useStandardError()
    const [inputText, setInputText] = useState("")
    const [characterCounter, setCharacterCounter] = useState(maxCharacters)

    const [isIncludeImage, setIsIncludeImage] = useState(false)
    const [imageURL, setImageURL] = useState("")

    const handleInput = e => {
        let text = e.target.value

        if (text.length > maxCharacters)
            text = text.substr(0, maxCharacters)

        setCharacterCounter(maxCharacters - text.length)
        setInputText(text)
    }

    const handlePost = () => {
        if (inputText)
            axios.post(`/api/home/post`, {
                Post: inputText,
                ImageURL: imageURL
            })
                .then(() => {
                    setInputText("")
                    setImageURL("")
                    setIsIncludeImage(false)
                    setCharacterCounter(maxCharacters)
                    props.refreshPosts()
                })
                .catch(standardError)
    }

    const toggleImageURLMode = () => {
        setImageURL("")
        setIsIncludeImage(!isIncludeImage)
    }

    return (
        <div className="card" style={{ margin: "1rem auto" }}>
            <div className="card-content">
                <textarea required onChange={handleInput} className="textarea" placeholder="Plant your words into Word Grove" value={inputText} />
                <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", marginTop: "0.5rem", gap: "0.5rem" }}>
                    <button class="button is-small" title={isIncludeImage ? "Cancel image" : "Add image"} style={{ borderRadius: "4px", width: "2rem" }} onClick={toggleImageURLMode}>
                        <FontAwesomeIcon style={{ fontSize: "1.25rem" }} icon={isIncludeImage ? faXmark : faImage} />
                    </button>
                    {isIncludeImage ? <input value={imageURL} onChange={e => setImageURL(e.target.value)} class="input is-small" style={{ borderRadius: "4px" }} type="text" placeholder="Image URL"></input> : <div style={{ width: "100%" }}></div>}
                    <button disabled={!inputText} onClick={handlePost} className="button is-primary">Post</button>
                </div>
                <div style={{ float: "left", color: "lightgray", fontSize: "0.9rem" }} >Remaining characters: {characterCounter}</div>
            </div>

        </div>
    )
}

export default PostBox