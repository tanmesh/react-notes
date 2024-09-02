/**
 * createAsyncThunk is used for creation and dispatch of async actions.
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: false,
    user: [],
    error: '',
};

/**
 * createAsyncThunk is a function that accepts two arguments, 
 * - a string action type and a callback function to create payload.
 * 
 * Generates pending, fulfilled and rejected action types.
 */
export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
    return axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response => response.data)
        .catch(error => error.message);
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Reducer functions
    },
    /**
     * Extra reducers are for handling async actions. 
     * This is needed as createAsyncThunk dynamically generates these action types.
     */
    extraReducers: builder => {
        builder.addCase(fetchUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = '';
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.loading = false;
            state.user = [];
            state.error = action.error.message;
        });
    }
});

export default userSlice.reducer; // Export the reducer