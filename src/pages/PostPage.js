import React from 'react'
import { useParams, useHistory } from 'react-router-dom'

import ExpandedPost from '../components/ExpandedPost'

const PostPage = props => {
    const history = useHistory()
    const { postID } = useParams()

    const postDeleted = () => {
        history.push("/")
    }

    return <div className="container">
        <ExpandedPost postID={postID} onPostDelete={postDeleted} />
    </div>
}

export default PostPage