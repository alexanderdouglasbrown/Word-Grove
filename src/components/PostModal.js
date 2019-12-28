import React from 'react'
import Modal from 'react-modal'

import ExpandedPost from '../components/ExpandedPost'

Modal.setAppElement('#root');

const PostModal = props => {
    const { isOpen, closeModal, postID } = props

    return <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={{
            content: {
                padding: "2rem",
                maxWidth: "100%",
                maxhHeight: "100%",
                margin: "auto"
            },
            overlay: {
                zIndex: 35,
                backgroundColor: "rgba(128, 128, 128, 0.7)"
            }
        }}
    >
        <div className="container">
            <ExpandedPost id={postID} />
        </div>
    </Modal>
}

export default PostModal