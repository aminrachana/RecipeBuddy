import { createSlice } from '@reduxjs/toolkit';
import { addIngredient, deleteIngredient, getIngredient } from '../actions/ingredientActions';

const initialState = {
    loading: false,
    data: null,
    success: false,
    error: false
}

const ingredientSlice = createSlice({
    name: "ingredient",
    initialState,
    reducers: {
        reset: () => initialState
    },
    extraReducers: {
        //get ingredients list
        [getIngredient.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [getIngredient.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.data = payload.data
            state.success = true
        },
        [getIngredient.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        //Add ingredient
        [addIngredient.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [addIngredient.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.data = payload.data
            state.success = true
        },
        [addIngredient.rejected]: (state, { error }) => {
            state.loading = false
            state.error = error
        },
        //Delete ingredient
        [deleteIngredient.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [deleteIngredient.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.data = payload.data
            state.success = true
        },
        [deleteIngredient.rejected]: (state, { error }) => {
            state.loading = false
            state.error = error
        },
    }
});

export const { reset } = ingredientSlice.actions;

export default ingredientSlice.reducer;