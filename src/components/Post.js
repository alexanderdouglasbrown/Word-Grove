import React from 'react'
import Linkify from 'react-linkify'

import '../components/css/LinkButton.css'

const Post = props => {
    const { post, username, date, id } = props.postData

    return (
        <div className="card" style={{ padding: "1rem", marginTop: 0, marginBottom: "0.75rem", whiteSpace: "pre-wrap" }}>
            <Linkify>{post}</Linkify>
            <div style={{ marginTop: "0.5rem", width: "100%", backgroundColor: "lightgray", height: "2px", opacity: 0.2, borderRadius: "0.5rem" }}></div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem", fontSize: "0.7rem", color: "gray" }}>
                <div>
                    {`${username}, ${date}`}
                </div>
                <div className="LinkButton" onClick={() => props.expandPost(id)}>
                    Comments
                </div>
            </div>
        </div>)
}

export default Post