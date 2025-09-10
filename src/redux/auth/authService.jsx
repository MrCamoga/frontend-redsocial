import axios from 'axios';
import { API_URL } from '../../config';

const authService = {
    register: async (user) => {
        const res = await axios.post(`${API_URL}/users`,user, {headers: {'Content-Type': 'multipart/form-data'}});
        return res.data;
    },
    login: async (user) => {
        const res = await axios.post(`${API_URL}/auth/login`,user);
        if(res.data) {
            localStorage.setItem("token",res.data.data);
        }
        return res.data;
    },
    logout: async () => {
        const res = await axios.delete(`${API_URL}/auth/logout`, { headers: {"Authorization": localStorage.getItem('token')}});
        return res.data;
    },
    getUserInfo: async () => {
        const res = await axios.get(`${API_URL}/users`, { headers: { "Authorization": localStorage.getItem('token')}});
        return res.data;
    },
    getProfile: async (username) => {
        const res = await axios.get(`${API_URL}/users/${username}`, { headers: { "Authorization": localStorage.getItem('token')}});
        return res.data;
    }
};

export default authService;