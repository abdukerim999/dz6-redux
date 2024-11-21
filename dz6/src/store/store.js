import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import apiReducer from './apiSlice';

const store = configureStore({
    reducer: {
        counter: counterReducer,
        api: apiReducer,
    },
});

export default store;
