import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getProfile } from '../../redux/auth/authSlice';
import { API_URL } from '../../config';
import GoBack from '../goback/GoBack';
import PostList from '../post/PostList';

import './Profile.scss'

const Profile = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    if(!username) navigate('/');
    const [errorProfile,setError] = useState("");
    const { profile } = useSelector(state => state.auth);

    useEffect(() => {
        (async () => {
            try {
                await dispatch(getProfile(username)).unwrap();
            } catch (error) {
                setError("Profile could not be loaded");
                console.log(error);
            }
        })();
    }, []);

    return (
        <>
            <GoBack text={`${profile ? profile.screenname:username} profile`} />
            {profile ? <div className='profile'>
                <div className='profileHeader'>
                    <h1>{username}</h1>
                    <img src={profile.avatar ? `${API_URL}/media/avatar/${profile._id}`:'/default_pfp.svg'} alt="Profile picture" />         
                    <span>Joined {new Date(profile.createdAt).toLocaleDateString()}</span>
                </div>
                <PostList posts={profile.posts} user={profile}/>
            </div>:
            <h1>{errorProfile}</h1>
            }
        </>
    )
};

export default Profile;