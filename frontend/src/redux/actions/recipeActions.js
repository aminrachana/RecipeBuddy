import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const BASE_URL = 'http://localhost:3000/api'

export const getRecipe = createAsyncThunk(
    'recipe/',
    async ({ filters }, { rejectWithValue }) => {
        try {
            const res = await axios.get(
                `${BASE_URL}/recipe/`, {
                params: filters
            })
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

export const addRecipe = createAsyncThunk(
    'recipe/upload',
    async ({ name, detail, country, cook_id, photoImages, thumbnailImage, steps, ingredients_qty }, { rejectWithValue }) => {
        const data = new FormData()
        data.append("name", name)
        data.append("detail", detail)
        data.append("country", country)
        data.append("cook_id", cook_id)
        data.append("photoImages", photoImages)
        data.append("thumbnailImage", thumbnailImage)
        data.append("steps", JSON.stringify(steps))
        data.append("ingredients", JSON.stringify(ingredients_qty))
        try {
            const res = await axios.post(
                `${BASE_URL}/recipe/upload`,
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

export const deleteRecipe = createAsyncThunk(
    'recipe/',
    async ({ id }, { rejectWithValue }) => {
        try {
            const res = await axios.delete(
                `${BASE_URL}/recipe/delete/${id}`,
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
