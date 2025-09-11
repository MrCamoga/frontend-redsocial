import { Link, useNavigate, useParams } from 'react-router-dom';

import { API_URL } from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { deletePost, getPostById, sendReply, likePost } from '../../redux/posts/postSlice';
import ReplyList from './ReplyList';
import GoBack from '../goback/GoBack';
import { HeartFilled, HeartOutlined, DeleteOutlined } from '@ant-design/icons';
import Overlay from '../overlay/Overlay';

const Post = () => {
    const { postid } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { post } = useSelector(state => state.posts);
    const { user } = useSelector(state => state.auth);
    const [dateString,setDate] = useState("");
    const [liked,setLiked] = useState(false);
    const [overlay,setOverlay] = useState(false);

    const like = () => {
        dispatch(likePost({id:post._id,like:!post.likes.includes(user._id)}))
    }

    const handleDelete = async () => {
        try {
            await dispatch(deletePost(post._id)).unwrap();
            navigate(-1);
        } catch(error) {
            console.log(error);
        }
    }

    const reply = async (e) => {
        e.preventDefault();
        console.log(e.target.text.value)
        try {
            await dispatch(sendReply({postid, text: e.target.text.value})).unwrap();
            e.target.reset();
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        dispatch(getPostById(postid));
    },[]);

    useEffect(() => {
        if(post) {
            const date = new Date(post.createdAt);
            setDate(date.toLocaleTimeString() + " " + date.toLocaleDateString());
        }
    }, [post]);

    useEffect(() => {
        if(user && post) setLiked(post.likes.includes(user._id));
    }, [user,post]);
    
    const handleOpenImg = (e) => {
        e.stopPropagation();
        setOverlay(true);
    }

    return <>
        <GoBack text="Post"/>
        {post && 
        <div className='postDetail'>
            <div className="post">
                <div className="postHeader">
                    <Link to={`/profile/${post.userId.username}`}>
                        <img src={post.userId.avatar ? `${API_URL}/media/avatar/${post.userId._id}`:'/default_pfp.svg'} alt="" />
                        <b>{post.userId.screenname}</b>
                        <span>@{post.userId.username}</span>
                    </Link>
                </div>
                <div className='postBody'>
                    <h3>{post.title}</h3>
                    <p>{post.text}</p>
                    {post.image && <img onClick={handleOpenImg} src={`${API_URL}/media/${post._id}`}/>}
                    <span>{dateString}</span>
                </div>
                <div className='postButtons'>
                    <span>{React.createElement(liked ? HeartFilled:HeartOutlined, {onClick: like, className: `icon icon-like ${liked && 'liked'}`})} {post.likes.length}</span>
                    {post.userId._id == user?._id && <DeleteOutlined className='icon' onClick={handleDelete} />}
                </div>
            </div>
            <form className='postReplyForm' onSubmit={reply}>
                <textarea name='text' rows='5' maxLength={500} placeholder='Write your thoughts...' required></textarea>
                <input className='replyButton' type='submit' value='Reply'/>
            </form>
            <ReplyList posts={post.comments}/>
            {overlay &&<Overlay onClose={() => setOverlay(false)}><img src={`${API_URL}/media/${post._id}`}/></Overlay>}
        </div>
        }
    </>
};

export default Post;