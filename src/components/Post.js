import React from 'react'
import Linkify from 'react-linkify'

const Post = props => {
    return (
        <div className="card" style={{ padding: "1rem", marginTop: 0, marginBottom: "0.75rem", whiteSpace: "pre-wrap" }}>
            <Linkify>{props.post}</Linkify>
        </div>)
}

export default Post