import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from '../services/userServices';

const initialState = {
    users: [],
    loading: false,
    error: null,
}

export const createUser = createAsyncThunk(
    "Users/create",
    async( data, thunkAPI ) => {
        try{
            //console.log("Data sent to createUser:", data);
            const res = await userService.createUser(data);
            //console.log("Response from createUser:", res.data);
            return res.data;
        }
        catch(error){
            //console.error("Error in createUser:", error.response.data);
            return thunkAPI.rejectWithValue(error.response.data);
        }

    }
);

export const updateUser = createAsyncThunk(
    "Users/update",
    async ({ id, data }, thunkAPI) => {
        try {
            const res = await userService.updateUser(id, data);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const retrieveUser = createAsyncThunk(
    "Users/retrieve",
    async (_, thunkAPI) => {
        try {
            const res = await userService.getUser();
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const deleteUser = createAsyncThunk(
    "Users/delete",
    async (id, thunkAPI) => {
        try {
            await userService.deleteUser(id);
            return { id };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const userSlice = createSlice({
    name: "users",
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(retrieveUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(retrieveUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
        })
        .addCase(retrieveUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })

        .addCase(createUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(createUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users.push(action.payload);
        })
        .addCase(createUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })

        .addCase(deleteUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            state.loading = false;
            const { id } = action.payload;
            if(id){
                state.users = state.users.filter(user => user.id !== id);
            }
        })
        .addCase(deleteUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })

        .addCase(updateUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateUser.fulfilled, (state,action) => {
            state.loading = false;
            const { id } = action.payload;
            if(id){
                state.users = state.users.map(user => user.id === id ? action.payload : user);
                }
        })
        .addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            });
    },
});

const {reducer} = userSlice;
export default reducer;

        // [createUser.pending]: (state) => {
        //     state.loading = true;
        // },
        // [createUser.fulfilled]: (state, action) => {
        //     state.loading = false;
        //     state.users.push(action.payload);
        // },
        // [createUser.rejected]: (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload.message;
        // },

        // [updateUser.pending]: (state) => {
        //     state.loading = true;
        // },
        // [updateUser.fulfilled]: (state, action) => {
        //     state.loading = false;
        //     state.users = state.users.map((usr) => 
        //         usr.id === action.id ? action.payload : usr
        //     );
            // const index = state.findIndex(({ user }) => user.id === action.payload.id);
            // state[index] = {
            //     ...state[index],
            //     ...action.payload,
            //},
        // [updateUser.rejected]: (state, action) =>{
        //     state.loading = false;
        //     state.error = action.payload.message;
        // },
                // [retrieveUser.pending]: (state) => {
        //     state.loading = true;
        // },
        // [retrieveUser.fulfilled]: (state, action) => {
        //     state.loading = false;
        //     //console.log({users : action.payload ?. data})
        //     //return [...action.payload];
        //     console.log("State before update:", state.users); // Debugging
        //     state.users = action.payload; 
        //     console.log("State after update:", state.users); // Debugging
        // },
        // [retrieveUser.rejected]: (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload.message;
        // },

        // [deleteUser.pending]: (state) => {
        //     state.loading = true;
        // },
        // [deleteUser.fulfilled]: (state, action) => {
        //     state.loading = false;
        //     // let index = state.findIndex(({ id })=> id === action.payload.id);
        //     // state.splice(index, 1)
        //     const { id } =  action.payload;
        //     if(id) {
        //         state.users = state.users.filter((usr) => usr.id !== id)
        //     }
        // },
        // [deleteUser.rejected]: (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload.message;
        // },