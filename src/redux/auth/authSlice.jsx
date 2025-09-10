import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
    user: null,
    token: localStorage.getItem('token'),
    error: null,
    profile: null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state,action) => {
            state.token = action.payload.data;
        }).addCase(register.fulfilled, (state,action) => {
            state.success = true;
        }).addCase(register.rejected, (state,action) => {
            state.error = action.payload.message;
        }).addCase(getUserInfo.fulfilled, (state,action) => {
            state.user = action.payload.data;
        }).addCase(getUserInfo.rejected, (state, action) => {

        }).addCase(logout.fulfilled, (state, action) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem("token");
        }).addCase(getProfile.fulfilled, (state,action) => {
            state.profile = action.payload.data;
        })
    }
});

export const register = createAsyncThunk('auth/register', async (user) => {
    try {
        return await authService.register(user);
    } catch (error) {
        console.log(error);
    }
});

export const login = createAsyncThunk('auth/login', async (user) => {
    try {
        return await authService.login(user);
    } catch (error) {
        console.log(error);
    }
});

export const logout = createAsyncThunk('auth/logout', async () => {
    try {
        return await authService.logout();
    } catch (error) {
        console.log(error);
    }
});

export const getUserInfo = createAsyncThunk('users/getInfo', async () => {
    try {
        return await authService.getUserInfo();
    } catch (error) {
        console.log(error)
    }
})

export const getProfile = createAsyncThunk('users/getProfile', async (username) => {
    try {
        return await authService.getProfile(username);
    } catch (error) {
        console.log(error)
    }
})

export default authSlice.reducer;