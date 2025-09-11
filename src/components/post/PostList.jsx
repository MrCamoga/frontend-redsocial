import MiniPost from "./MiniPost"

const PostList = ({posts,user}) => {
    return <div className="postList">
        {posts.map(post => <MiniPost key={post._id} post={user ? {...post,userId:user}:post}/>)}
    </div>
};

export default PostList;