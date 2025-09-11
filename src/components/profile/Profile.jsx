import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProfile } from '../../redux/posts/postSlice';
import { API_URL } from '../../config';
import GoBack from '../goback/GoBack';
import PostList from '../post/PostList';

import './Profile.scss'

const Profile = () => {
    const { username, postType = "posts" } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    if(!username) navigate('/');
    const [errorProfile,setError] = useState("");
    const { profile } = useSelector(state => state.posts);

    useEffect(() => {
        (async () => {
            try {
                await dispatch(getProfile(username)).unwrap();
            } catch (error) {
                setError(error);
            }
        })();
    }, []);

    const filterPosts = () => {
        switch(postType) {
            case "media":
                return profile.posts.filter(post => post.image);
            case "posts":
            default:
                return profile.posts;
        }
    }

    return (
        <>
            <GoBack text={`${profile ? profile.screenname:username} profile`} />
            {profile ? <div className='profile'>
                <div className='profileHeader'>
                    <img src={profile.avatar ? `${API_URL}/media/avatar/${profile._id}`:'/default_pfp.svg'} alt="Profile picture" />         
                    <h1>{profile.screenname}</h1>
                    <span>@{username}</span><br/>
                    <span>Joined {new Date(profile.createdAt).toLocaleDateString()}</span>
                </div>
                <nav className='postsNav'>
                    <ul>
                        <li><Link className={postType=="posts" && 'active'} to={`/profile/${username}/posts`}>Posts</Link></li>
                        <li><Link className={postType=="media" && 'active'} to={`/profile/${username}/media`}>Multimedia</Link></li>
                    </ul>
                </nav>
                <PostList posts={filterPosts()} user={profile}/>
            </div>:
            <h1>{errorProfile}</h1>
            }
        </>
    )
};

export default Profile;