import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from '../services/userServices';

const initialState = [];

export const createUser = createAsyncThunk(
    "Users/create",
    async({ username, email }) => {
        const res = await userService.createUser({username, email});
        return res.data;
    }
);

export const updateUser = createAsyncThunk(
    "Users/update",
    async({ id, data }) => {
        const  res = await userService.updateUser(id, data);
        return res.data;
    }
);

export const retrieveUser = createAsyncThunk(
    "Users/retrieve",
    async() => {
        const res = await userService.getUser();
        return res.data;
    }
);

export const deleteUser = createAsyncThunk(
    "Users/delete",
    async({ id }) => {
        await userService.deleteUser(id);
        return { id };
    } 
);

const userSlice = createSlice({
    name: "User",
    initialState,
    extraReducer: {
        [createUser.fulfilled]: (state, action) => {
            state.push(action.payload);
        },
        [updateUser.fulfilled]: (state, action) => {
            const index = state.findIndex(({ user }) => user.id === action.payload.id);
            state[index] = {
                ...state[index],
                ...action.payload,
            };
        },
        [retrieveUser.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [deleteUser.fulfilled]: (state, action) => {
            let index = state.findIndex(({ id })=> id === action.payload.id);
        },
    },
});

const {reducer} = userSlice;
export default reducer;