import { useDispatch } from "react-redux";
import { createPost } from "../../redux/posts/postSlice";

import "./PostForm.scss"
import { useState } from "react";
import UploadImage from "../uploadImg/UploadImage";

const PostForm = () => {
    const dispatch = useDispatch();
    const [image,setImage] = useState(null);

    const handlePost = async (e) => {
        e.preventDefault();
        try {
            await dispatch(createPost(new FormData(e.target))).unwrap();
            e.target.reset();
            setImage(null);
        } catch(error) {
            console.log(error);
        }
    }

    const handleImageChange = (e) => {
        if(e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
        }
    }

    return <form className="postForm" onSubmit={handlePost}>
        <input type="text" name="title" id="title" placeholder="Title" required/>
        <textarea rows="5" name="text" id="text" placeholder="Write your thoughts" required></textarea>
        {/* <input type="file" onChange={handleImageChange} name="image" accept="image/*"/> */}
        <UploadImage name="image" onChange={handleImageChange} img={image}/>
        <input className="postButton" type="submit" value="Post"/>
    </form>
};

export default PostForm;