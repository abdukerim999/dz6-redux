import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchApiData = createAsyncThunk('api/fetchData', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    return response.data;
});

const apiSlice = createSlice({
    name: 'api',
    initialState: { data: null, status: 'idle', error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchApiData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchApiData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchApiData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default apiSlice.reducer;
