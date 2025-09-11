import axios from 'axios';
import { API_URL } from '../../config';

const postService = {
    createPost: async (post) => {
        const res = await axios.post(`${API_URL}/posts`,post, { headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': localStorage.token
        }});
        return res.data;
    },
    updatePost: async (post) => {
        const res = await axios.update(`${API_URL}/posts`, post, { headers: {'Authorization': localStorage.getItem("token") }});
        return res.data;
    },
    deletePost: async (postid) => {
        const res = await axios.delete(`${API_URL}/posts/${postid}`, { headers: {'Authorization': localStorage.getItem("token") }});
        return res.data;
    },
    deleteComment: async (commentid) => {
        const res = await axios.delete(`${API_URL}/comments/${commentid}`, { headers: {'Authorization': localStorage.getItem("token") }});
        return res.data;
    },
    getPostById: async (id) => {
        const res = await axios.get(`${API_URL}/posts/${id}`);
        return res.data;
    },
    getPostByTitle: async (title) => {
        const res = await axios.get(`${API_URL}/posts/${title}`);
        return res.data;
    },
    getPosts: async () => {
        const res = await axios.get(`${API_URL}/posts`);
        return res.data;
    },
    likePost: async ({id,like}) => {
        const res = like ? 
            await axios.post(`${API_URL}/posts/${id}/likes`, {}, { headers: { "Authorization": localStorage.getItem("token")}}):
            await axios.delete(`${API_URL}/posts/${id}/likes`, { headers: { "Authorization": localStorage.getItem("token")}});
        return res.data;
    },
    likeComment: async ({id,like}) => {
        const res = like ? 
            await axios.post(`${API_URL}/comments/${id}/likes`, {}, { headers: { "Authorization": localStorage.getItem("token")}}):
            await axios.delete(`${API_URL}/comments/${id}/likes`, { headers: { "Authorization": localStorage.getItem("token")}});
        return res.data;
    },
    sendReply: async ({postid,text}) => {
        console.log(text)
        const res = await axios.post(`${API_URL}/posts/${postid}/comments`, {text}, { headers: { "Authorization": localStorage.getItem("token")}});
        return res.data;
    },
    getProfile: async (username) => {
        const res = await axios.get(`${API_URL}/users/${username}`, { headers: { "Authorization": localStorage.getItem('token')}});
        return res.data;
    }
};

export default postService;