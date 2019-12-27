import React from 'react'
import { useParams } from 'react-router-dom'

import ExpandedPost from '../components/ExpandedPost'

const PostPage = props => {
    const { id } = useParams()

    return <div className="container">
        <ExpandedPost id={id} />
    </div>
}

export default PostPage