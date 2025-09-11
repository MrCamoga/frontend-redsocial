import { useEffect } from "react";
import PostForm from "../post/PostForm";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/posts/postSlice";
import PostList from "../post/PostList";
import "./Home.scss";
import { Link } from "react-router-dom";

const Home = () => {
    const { token } = useSelector(state => state.auth);
    const { posts } = useSelector(state => state.posts);
    const dispatch = useDispatch();
    useEffect(() => {
        if(token) {
            dispatch(getPosts());
        }
    },[]);

    return (token ? 
        <>
            <PostForm />
            <PostList posts={posts}/>
        </>:
        <div className="homePage">
            <h1>Welcome to Red Social!</h1>
            <p>
                Join a vibrant community, share your thoughts, and connect with friends around the world.
                Sign up today or log in to get started!
            </p>
            <Link className='button' to='/login'>Sign in</Link>
            <Link className='button signUp' to='/register'>Create an account</Link>
        </div>
    );
}

export default Home;