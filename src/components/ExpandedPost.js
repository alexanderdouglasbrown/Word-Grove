import React from 'react'

const ExpandedPost = props => {
    const postID = props.id

    return <>
        {postID ?
            <>
                {`Post ID: ${props.id}`}
            </>
            :
            null
        }
    </>
}

export default ExpandedPost