import React from 'react'

const Post = props => {
    return (<>
        {
            <div key={props.id}>
                {props.message}
            </div>
        }
    </>)
}

export default Post