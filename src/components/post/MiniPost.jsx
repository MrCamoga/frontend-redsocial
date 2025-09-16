import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../../config';
import { Link, useNavigate } from 'react-router-dom';

import "./Post.scss";

import { 
    likePost, 
    likeComment, 
    deletePost, 
    deleteComment 
} from '../../redux/posts/postSlice';
import { DeleteOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import Overlay from '../overlay/Overlay';

const MiniPost = ({post, reply}) => {
    post = post || reply;
    const { user } = useSelector(state => state.auth);
    const [liked,setLiked] = useState(false);
    const [overlay,setOverlay] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(user) setLiked(post.likes.includes(user._id));
    },[user]);

    const like = async (e) => {
        e.stopPropagation();
        const data = {id:post._id,like:!liked};
        try {
            await dispatch((reply ? likeComment:likePost)(data)).unwrap();
            setLiked(!liked);
        } catch(error) {
            console.log(error);
        }
    }

    const handleDelete = (e) => {
        e.stopPropagation();
        if(reply) dispatch(deleteComment(post._id));
        else dispatch(deletePost(post._id));
    }

    const handleClick = () => {
        if(!reply) navigate(`/posts/${post._id}`);
    }

    const handleOpenImg = (e) => {
        e.stopPropagation();
        setOverlay(true);
    }

    return <div className="minipost" onClick={handleClick}>
        <div className="postHeader">
            <Link onClick={e => e.stopPropagation()} to={`/profile/${post.userId.username}`}>
                <img src={post.userId.avatar ? `${API_URL}/media/avatar/${post.userId._id}`:'/default_pfp.svg'} alt="Profile picture" />
                <div>
                    <b>{post.userId.screenname}</b>
                    <span>@{post.userId.username}</span>
                </div>
            </Link>
            <span className='postDate'>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <div className='postBody'>
            <h3>{post.title}</h3>
            <p>{post.text}</p>
            {post.image && <img onClick={handleOpenImg} src={`${API_URL}/media/${post._id}`}/>}
        </div>
        <div className='postButtons'>
            <span>{React.createElement(liked ? HeartFilled:HeartOutlined, {onClick: like, className: `icon icon-like ${liked && 'liked'}`})} {post.likes.length}</span>
            {post.userId._id == user?._id && <DeleteOutlined className='icon' onClick={handleDelete} />}
        </div>
        {overlay && <Overlay onClose={() => setOverlay(false)}><img src={`${API_URL}/media/${post._id}`}/></Overlay>}
    </div>
};

export default MiniPost;