import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import tagService from '../services/tagService';

const initialState = {
    tags: [],
    loading: false,
    error: null,
}

export const createTag = createAsyncThunk(
    "Tags/create",
    async( data, thunkAPI ) => {
        try{
            //console.log("Data sent to createTag:", data);
            const res = await tagService.createTag(data);
            //console.log("Response from createTag:", res.data);
            return res.data;
        }
        catch(error){
            //console.error("Error in createTag:", error.response.data);
            return thunkAPI.rejectWithValue(error.response.data);
        }

    }
);

export const updateTag = createAsyncThunk(
    "Tags/update",
    async( id, data ) => {
        const  res = await tagService.updateTag(id, data);
        return res.data;
    }
);

export const retrieveTag = createAsyncThunk(
    "Tags/retrieve",
    async() => {
        const res = await tagService.getTag();
        return res.data;
    }
);

export const deleteTag = createAsyncThunk(
    "Tags/delete",
    async(id, {rejectWithValue}) => {
        try{
            await tagService.deleteTag(id);
            return { id };
        }
        catch(error){
            return rejectWithValue(error.response.data);
        }
    } 
);

const tagSlice = createSlice({
    name: "tags",
    initialState,
    extraReducer: (builder) => {
        builder
        .addCase(retrieveTag.pending, (state) => {
            state.loading = true;
        })
        .addCase(retrieveTag.fulfilled, (state, action) => {
            state.loading = false;
            state.tags = action.payload;
        })
        .addCase(retrieveTag.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })

        .addCase(createTag.pending, (state) => {
            state.loading = true;
        })
        .addCase(createTag.fulfilled, (state, action) => {
            state.loading = false;
            state.tags.push(action.payload);
        })
        .addCase(createTag.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })

        .addCase(deleteTag.pending, (state) => {
            state.loading = true;
        })
        .addCase(deleteTag.fulfilled, (state, action) => {
            state.loading = false;
            const { id } = action.payload;
            if(id){
                state.tags = state.tags.filter(tag => tag.id !== id);
            }
        })
        .addCase(deleteTag.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })

        .addCase(updateTag.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateTag.fulfilled, (state, action) => {
            state.loading = false;
            const { id } = action.payload;
            if(id){
                state.tags= state.tags.map(tag => tag.id === id ? action.payload : tag);
                }
        })
        .addCase(updateTag.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    },
});

const {reducer} = tagSlice;
export default reducer;