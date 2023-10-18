import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const BASE_URL = 'https://recipe-buddy-api.onrender.com/api'

export const getRatings = createAsyncThunk(
    'rating/',
    async ({ recipeId }, { rejectWithValue }) => {
        try {
            const res = await axios.get(
                `${BASE_URL}/rating/getByRecipe?recipe_id=${recipeId}`,
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

export const addRating = createAsyncThunk(
    'rating/addRating',
    async ({ userId, recipeId, rating_stars }, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                `${BASE_URL}/rating/addRating`,
                { user_id: userId, recipe_id: recipeId, rating_stars }
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