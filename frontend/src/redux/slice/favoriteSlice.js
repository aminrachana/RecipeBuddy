import { createSlice } from '@reduxjs/toolkit';
import { toggleFavorite, getFavorite } from '../actions/favoriteActions';

const initialState = {
    loading: false,
    data: null,
    success: false,
    error: false
}

const favoriteSlice = createSlice({
    name: "favorite",
    initialState,
    reducers: {
        reset: () => initialState
    },
    extraReducers: {
        //get favorites list
        [getFavorite.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [getFavorite.fulfilled]: (state, { payload }) => {
            console.log('payload ', payload);
            state.loading = false
            state.data = payload.data
            state.success = true
        },
        [getFavorite.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        //Toggle favorite
        [toggleFavorite.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [toggleFavorite.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.success = true
        },
        [toggleFavorite.rejected]: (state, { error }) => {
            state.loading = false
            state.error = error
        },
    }
});

export const { reset } = favoriteSlice.actions;

export default favoriteSlice.reducer;