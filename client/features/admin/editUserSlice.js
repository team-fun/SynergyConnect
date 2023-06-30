import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const TOKEN = 'token';


export const fetchSingleUser = createAsyncThunk(
    "singleUser", async(userId) => {
        const token = window.localStorage.getItem(TOKEN);
        try{
            const {data} = await axios.get(`/api/admin/${userId}`, {
                headers: {
                    authorization: token
                },
            })
            return data
        } catch (err) {
            console.log(err)
        }
    }
)

export const editUser = createAsyncThunk(
    "editUser", 
    async ({ id, username, password, firstName, lastName, email, bio, icon }) => {
      const token = window.localStorage.getItem(TOKEN);
      const response = await axios.put(`/api/admin/${id}`, {
        username,
        password,
        firstName,
        lastName,
        email,
        bio,
        icon,
      }, {
        headers: {
          authorization: token
        }
      });
      return response.data;
    }
)

const editUserSlice = createSlice({
    name: "editUser",
    initialState: {
        editUserObj: {}
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSingleUser.fulfilled, (state, action) => {
            state.editUserObj = action.payload
        }),
        builder.addCase(editUser.fulfilled, (state, action) => {
            state.editUserObj = action.payload;
        })
    }
})

// export const selectUser = (state) => state.user;


export default editUserSlice.reducer