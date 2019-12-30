import React from 'react'
import Linkify from 'react-linkify'
import { Link } from 'react-router-dom'

import '../components/css/LinkButton.css'

const Post = props => {
    const { post, username, id } = props.postData

    const expandPost = e => {
        if (e.target && e.target.tagName && e.target.tagName.toLowerCase() !== "a")
            props.expandPost(id)
    }

    return (
        <div className="card" style={{ margin: "1rem auto" }}>
            <div className="card-content" style={{ whiteSpace: "pre-wrap", cursor: "pointer" }} onClick={e => expandPost(e)}>
                <Linkify>{post}</Linkify>
            </div>
            <div className="card-footer" style={{ justifyContent: "space-between", fontSize: "0.7rem", color: "gray", padding: "1rem" }}>
                <div>
                    {!props.hidePostedBy && <>
                        <div style={{ display: "inline-block" }}>Posted by&nbsp;</div>
                        <div style={{ display: "inline-block" }} className="LinkButton"><Link to={`/p/${username}`}>{`${username}`}</Link></div>
                    </>}
                </div>
                <div className="LinkButton">Like</div>
            </div>
        </div>)
}

export default Post