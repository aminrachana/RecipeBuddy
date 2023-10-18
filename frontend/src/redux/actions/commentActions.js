import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const BASE_URL = 'https://recipe-buddy-api.onrender.com/api'

export const getComments = createAsyncThunk(
    'comment/',
    async ({ recipeId }, { rejectWithValue }) => {
        try {
            const res = await axios.get(
                `${BASE_URL}/comment/getByRecipe?recipe_id=${recipeId}`,
            )
            return res?.data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const addComment = createAsyncThunk(
    'comment/addComment',
    async ({ userId, recipeId, comment }, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                `${BASE_URL}/comment/addComment`,
                { user_id: userId, recipe_id: recipeId, comment }
            )
            return res?.data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)