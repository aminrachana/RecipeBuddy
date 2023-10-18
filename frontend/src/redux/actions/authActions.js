import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const BASE_URL = 'http://localhost:3000/api'

export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                `${BASE_URL}/auth/login`,
                { email, password },
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

export const registerUser = createAsyncThunk(
    'auth/register',
    async ({ name, email, password, role }, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                `${BASE_URL}/auth/register`,
                { name, email, password, role },
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