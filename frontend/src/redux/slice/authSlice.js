import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser } from './../actions/authActions'

const initialState = {
    loading: false,
    data: null,
    userToken: null,
    success: false,
    error: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        reset: () => initialState
    },
    extraReducers: {
        //auth/login user
        [loginUser.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [loginUser.fulfilled]: (state, { payload }) => {
            console.log('payload ', payload);
            state.loading = false
            state.data = payload.userData
            state.userToken = payload.token
            state.success = true
        },
        [loginUser.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        //Register user
        [registerUser.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [registerUser.fulfilled]: (state, { payload }) => {
            console.log('payload ', payload);
            state.loading = false
            state.data = payload.userData
            state.userToken = payload.token
            state.success = true
        },
        [registerUser.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
    }
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;