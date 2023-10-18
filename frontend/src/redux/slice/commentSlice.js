import { createSlice } from '@reduxjs/toolkit';
import { addComment, getComments } from '../actions/commentActions';

const initialState = {
    loading: false,
    data: null,
    success: false,
    error: false
}

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        reset: () => initialState
    },
    extraReducers: {
        //get comments list
        [getComments.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [getComments.fulfilled]: (state, { payload }) => {
            console.log('getComments payload ', payload);
            state.loading = false
            state.data = payload.data
            state.success = true
        },
        [getComments.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        //Add comment
        [addComment.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [addComment.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.success = true
        },
        [addComment.rejected]: (state, { error }) => {
            state.loading = false
            state.error = error
        },
    }
});

export const { reset } = commentSlice.actions;

export default commentSlice.reducer;