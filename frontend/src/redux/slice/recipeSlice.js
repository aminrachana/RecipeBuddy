import { createSlice } from '@reduxjs/toolkit';
import { addRecipe, getRecipe, deleteRecipe } from '../actions/recipeActions';

const initialState = {
    loading: false,
    data: null,
    success: false,
    error: false
}

const recipeSlice = createSlice({
    name: "recipe",
    initialState,
    reducers: {
        reset: () => initialState
    },
    extraReducers: {
        //get recipes list
        [getRecipe.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [getRecipe.fulfilled]: (state, { payload }) => {
            console.log('payload ', payload);
            state.loading = false
            state.data = payload.data
            state.success = true
        },
        [getRecipe.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        //Add recipe
        [addRecipe.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [addRecipe.fulfilled]: (state, { payload }) => {
            console.log('payload ', payload);
            state.loading = false
            state.data = payload.data
            state.success = true
        },
        [addRecipe.rejected]: (state, { error }) => {
            state.loading = false
            state.error = error
        },
        //Delete recipe
        [deleteRecipe.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [deleteRecipe.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.data = payload.data
            state.success = true
        },
        [deleteRecipe.rejected]: (state, { error }) => {
            state.loading = false
            state.error = error
        },
    }
});

export const { reset } = recipeSlice.actions;

export default recipeSlice.reducer;