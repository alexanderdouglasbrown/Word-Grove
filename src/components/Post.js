import React from 'react'

const Post = props => {
    return (<>
        {
            <div key={props.data.id}>
                {props.data.message}
            </div>
        }
    </>)
}

export default Post