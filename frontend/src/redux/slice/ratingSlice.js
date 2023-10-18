import { createSlice } from '@reduxjs/toolkit';
import { addRating, getRatings } from '../actions/ratingActions';

const initialState = {
    loading: false,
    data: null,
    ratingsAvg: 0,
    success: false,
    error: false
}

const ratingSlice = createSlice({
    name: "rating",
    initialState,
    reducers: {
        reset: () => initialState
    },
    extraReducers: {
        //get ratings list
        [getRatings.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [getRatings.fulfilled]: (state, { payload }) => {
            console.log('payload ', payload);
            state.loading = false
            state.data = payload.data
            state.ratingsAvg = payload.ratingsAvg
            state.success = true
        },
        [getRatings.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        //Add rating
        [addRating.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [addRating.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.success = true
        },
        [addRating.rejected]: (state, { error }) => {
            state.loading = false
            state.error = error
        },
    }
});

export const { reset } = ratingSlice.actions;

export default ratingSlice.reducer;