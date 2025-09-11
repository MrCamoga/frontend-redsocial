import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";

const initialState = {
    posts: [],
    post: null,
    profile: null
};

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createPost.fulfilled, (state,action) => {
            state.posts = [action.payload.data, ...state.posts];
        }).addCase(deletePost.fulfilled, (state,action) => {
            state.deleteSuccess = true;
            if(state.profile && state.profile._id == action.payload.userid) state.profile.posts = state.profile.posts.filter(post => post._id != action.payload.postid);
            state.posts = state.posts.filter(post => post._id != action.payload.postid);
        }).addCase(getPostById.fulfilled, (state,action) => {
            state.post = action.payload.data;
        }).addCase(getPosts.fulfilled, (state, action) => {
            state.posts = action.payload.data;
        }).addCase(sendReply.fulfilled, (state, action) => {
            state.post.comments = [...state.post.comments, action.payload.data];
        }).addCase(deleteComment.fulfilled, (state, action) => {
            state.post.comments = state.post.comments.filter(comment => comment._id != action.payload);
        }).addCase(likePost.fulfilled, (state,action) => {
            if(state.post?._id == action.payload.id) {
                if(action.payload.like) state.post.likes.push(action.payload.userid);
                else state.post.likes = state.post.likes.filter(userid => userid != action.payload.userid);
            }
            const likedPost = state.posts.find(post => post._id == action.payload.id);
            if(likedPost) {
                if(action.payload.like) likedPost.likes.push(action.payload.userid);
                else likedPost.likes = likedPost.likes.filter(userid => userid != action.payload.userid);
            }
        }).addCase(likeComment.fulfilled, (state,action) => {
            const likedComment = state.post.comments.find(comment => comment._id == action.payload.id);
            if(action.payload.like) likedComment.likes.push(action.payload.userid);
            else likedComment.likes = likedComment.likes.remove(action.payload.userid);
        }).addCase(getProfile.fulfilled, (state,action) => {
            state.profile = action.payload.data;
        })
    }
});

export const createPost = createAsyncThunk('post/create', async (post) => {
    try {
        return await postService.createPost(post);
    } catch (error) {
        console.log(error);
    }
});

export const updatePost = createAsyncThunk('post/update', async (post) => {
    try {
        return await postService.updatePost(post);
    } catch (error) {
        console.log(error);
    }
});

export const deletePost = createAsyncThunk('post/deletePost', async (postid, {getState}) => {
    try {
        await postService.deletePost(postid);
        return {postid, userid: getState().auth.user._id};
    } catch (error) {
        console.log(error);
    }
});

export const deletePostProfile = createAsyncThunk('post/deletePost', async (postid) => {
    try {
        await postService.deletePost(postid);
        return postid;
    } catch (error) {
        console.log(error);
    }
});

export const deleteComment = createAsyncThunk('post/deleteComment', async (commentid) => {
    try {
        await postService.deleteComment(commentid);
        return commentid;
    } catch (error) {
        console.log(error);
    }
});

export const likePost = createAsyncThunk('post/like', async (likeData, { getState }) => {
    try {
        await postService.likePost(likeData);
        return {...likeData, userid: getState().auth.user._id};
    } catch (error) {
        console.log(error);
    }
});

export const likeComment = createAsyncThunk('post/likeComment', async (likeData, {getState}) => {
    try {
        await postService.likeComment(likeData);
        return {...likeData, userid: getState().auth.user._id};
    } catch (error) {
        console.log(error);
    }
});

export const getPostById = createAsyncThunk('post/getById', async (id) => {
    try {
        return await postService.getPostById(id);
    } catch (error) {
        console.log(error);
    }
});

export const getPostByTitle = createAsyncThunk('post/getByTitle', async (id) => {
    try {
        return await postService.getPostById(id);
    } catch (error) {
        console.log(error);
    }
});

export const getPosts = createAsyncThunk('post/getAll', async () => {
    try {
        return await postService.getPosts();
    } catch (error) {
        console.log(error);
    }
});

export const sendReply = createAsyncThunk('post/sendReply', async (replyData) => {
    try {
        return await postService.sendReply(replyData);
    } catch (error) {
        console.log(error);
    }
});

export const getProfile = createAsyncThunk('users/getProfile', async (username, {rejectWithValue}) => {
    try {
        return await postService.getProfile(username);
    } catch (error) {
        return rejectWithValue('User could not be found');
    }
})

export default postSlice.reducer;