import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const Profile = props => {
    const { username } = useParams()
    const [profileData, setProfileData] = useState(null)
    // const [postsData, setPostsData] = useState(null)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/profile/user`,
            { params: { Username: username } })
            .then(res => setProfileData(res.data))
            .catch(err => {
                if (err && err.response && err.response.data && err.response.data.error)
                    toast.error(err.response.data.error)
                else
                    toast.error("Sorry, an error occured")
            })
    }, [username])

    return <div className="container">
        {profileData &&
            <>
                <h5 className="title">{`${profileData.username}'s Posts`}</h5>
                <>
                    {profileData.access !== "User" &&
                        <h5 className="subtitle">{profileData.access}</h5>
                    }
                </>
            </>
        }
    </div>
}

export default Profile