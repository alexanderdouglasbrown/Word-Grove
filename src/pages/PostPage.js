import React from 'react'
import { useParams, useHistory } from 'react-router-dom'

import ExpandedPost from '../components/ExpandedPost'

const PostPage = props => {
    const history = useHistory()
    const { id } = useParams()

    const postDeleted = () => {
        history.push("/")
    }

    return <div className="container">
        <ExpandedPost id={id} postDeleted={postDeleted} postEdited={()=>{}} />
    </div>
}

export default PostPage