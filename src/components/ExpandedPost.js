import React from 'react'

import Post from '../components/Post'

const ExpandedPost = props => {
    return <Post
        postID={props.postID}
        isExpanded
        onDelete={props.onPostDelete}
    />
}

export default ExpandedPost