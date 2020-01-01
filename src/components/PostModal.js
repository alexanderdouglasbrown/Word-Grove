import React from 'react'
import Modal from 'react-modal'

import ExpandedPost from '../components/ExpandedPost'

Modal.setAppElement('#root');

const PostModal = props => {
    const { isOpen, closeModal, postID } = props

    const onPostDelete = () => {
        closeModal()
    }

    return <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={{
            content: {
                padding: "1rem 0 1rem 0",
                maxWidth: "60rem",
                margin: "auto",
                top: "0.5rem",
                bottom: "0.5rem",
                left: "1.75rem",
                right: "1.75rem",
                overflowX: "hidden"
            },
            overlay: {
                zIndex: 35,
                backgroundColor: "rgba(128, 128, 128, 0.7)"
            }
        }}
    >
        <div className="container">
            <ExpandedPost
            postID={postID}
            onPostDelete={onPostDelete} />
        </div>
    </Modal>
}

export default PostModal