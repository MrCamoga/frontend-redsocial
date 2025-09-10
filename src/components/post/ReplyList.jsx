import MiniPost from "./MiniPost"

const ReplyList = ({posts}) => {
    return <div className="replyList">
        {posts.map(post => <MiniPost key={post._id} reply={post}/>)}
    </div>
};

export default ReplyList;