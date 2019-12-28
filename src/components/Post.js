import React from 'react'
import Linkify from 'react-linkify'

import '../components/css/LinkButton.css'

const Post = props => {
    const { post, username, date, id } = props.postData

    return (
        <div className="card" style={{ margin: "1rem auto" }}>
            <div className="card-content" style={{ whiteSpace: "pre-wrap", cursor: "pointer" }} onClick={() => props.expandPost(id)}>
                <Linkify>{post}</Linkify>
            </div>
            <div className="card-footer" style={{ justifyContent: "space-between", fontSize: "0.7rem", color: "gray", padding: "1rem" }}>
                <div>
                    {`${username}, ${date}`}
                </div>
                <div className="LinkButton">Like</div>
            </div>
        </div>)
}

export default Post