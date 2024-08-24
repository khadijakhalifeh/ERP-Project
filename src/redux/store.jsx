import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlicer';
import tagReducer from './tagSlicer'; 
import postReducer from './postSlicer'

const store = configureStore({
    reducer: {
        users: userReducer,
        tags: tagReducer,
        posts: postReducer,
    }
});

export default store;


