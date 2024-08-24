import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from '../services/postService';

const initialState = {
    posts: [],
    loading: false,
    error: null,
}

export const createPost = createAsyncThunk(
    "Posts/create",
    async( data, thunkAPI ) => {
        try{
            //console.log("Data sent to createPost:", data);
            const res = await postService.createPost(data);
            //console.log("Response from createPost:", res.data);
            return res.data;
        }
        catch(error){
            //console.error("Error in createPost:", error.response.data);
            return thunkAPI.rejectWithValue(error.response.data);
        }

    }
);

export const updatePost = createAsyncThunk(
    "Posts/update",
    async( id, data ) => {
        const  res = await postService.updatePost(id, data);
        return res.data;
    }
);

export const retrievePost = createAsyncThunk(
    "Posts/retrieve",
    async() => {
        const res = await postService.getPost();
        return res.data;
    }
);

export const deletePost = createAsyncThunk(
    "Posts/delete",
    async(id, {rejectWithValue}) => {
        try{
            await postService.deletePost(id);
            return { id };
        }
        catch(error){
            return rejectWithValue(error.response.data);
        }
    } 
);

const postSlice = createSlice({
    name: "posts",
    initialState,
    extraReducer: (builder) => {
        builder
        .addCase(retrievePost.pending, (state) => {
            state.loading = true;
        })
        .addCase(retrievePost.fulfilled, (state, action) => {
            state.loading = false;
            state.posts = action.payload;
        })
        .addCase(retrievePost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })

        .addCase(createPost.pending, (state) => {
            state.loading = true;
        })
        .addCase(createPost.fulfilled, (state, action) => {
            state.loading = false;
            state.posts.push(action.payload);
        })
        .addCase(createPost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })

        .addCase(deletePost.pending, (state) => {
            state.loading = true;
        })
        .addCase(deletePost.fulfilled, (state, action) => {
            state.loading = false;
            const { id } = action.payload;
            if(id){
                state.posts = state.posts.filter(post => post.id !== id);
            }
        })
        .addCase(deletePost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })

        .addCase(updatePost.pending, (state) => {
            state.loading = true;
        })
        .addCase(updatePost.fulfilled, (state, action) => {
            state.loading = false;
            const { id } = action.payload;
            if(id){
                state.posts= state.posts.map(post => post.id === id ? action.payload : post);
                }
        })
        .addCase(updatePost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    },
});

const {reducer} = postSlice;
export default reducer;