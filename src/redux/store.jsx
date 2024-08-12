import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlicer';

const store = configureStore({
    reducer: {
        users: userReducer
    }
});

export default store;

