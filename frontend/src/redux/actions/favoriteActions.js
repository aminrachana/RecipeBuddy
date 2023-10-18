import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const BASE_URL = 'http://localhost:3000/api'

export const getFavorite = createAsyncThunk(
    'favorite/',
    async ({ userId }, { rejectWithValue }) => {
        try {
            const res = await axios.get(
                `${BASE_URL}/favorite/getByUser?user_id=${userId}`,
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

export const toggleFavorite = createAsyncThunk(
    'favorite/toggleFavorite',
    async ({ userId, recipeId }, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                `${BASE_URL}/favorite/toggleFavorite`,
                { user_id: userId, recipe_id: recipeId }
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