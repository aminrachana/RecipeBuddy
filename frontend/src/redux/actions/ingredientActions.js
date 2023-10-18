import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const BASE_URL = 'http://localhost:3000/api'

export const getIngredient = createAsyncThunk(
    'ingredient/',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(
                `${BASE_URL}/ingredient/`,
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

export const deleteIngredient = createAsyncThunk(
    'ingredient/',
    async ({ id }, { rejectWithValue }) => {
        try {
            const res = await axios.delete(
                `${BASE_URL}/ingredient/delete/${id}`,
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

export const addIngredient = createAsyncThunk(
    'ingredient/upload',
    async ({ name, season, photo, is_vegetarian, is_non_vegetarian, is_egg, is_dairy }, { rejectWithValue }) => {
        const data = new FormData()
        data.append("name", name)
        data.append("season", season)
        data.append("photo", photo)
        data.append("is_vegetarian", is_vegetarian)
        data.append("is_non_vegetarian", is_non_vegetarian)
        data.append("is_egg", is_egg)
        data.append("is_dairy", is_dairy)
        try {
            const res = await axios.post(
                `${BASE_URL}/ingredient/upload`,
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
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