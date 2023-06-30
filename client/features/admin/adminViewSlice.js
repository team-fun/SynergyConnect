import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const TOKEN = 'token';


export const fetchAllUsers = createAsyncThunk(
    "allUsers", async () => {
        const token = window.localStorage.getItem(TOKEN);
        try{
            const{data} = await axios.get("/api/admin", {
                headers: {
                    authorization: token
                }
            })
            return data
        } catch (err) {
            console.log(err)
        }
    }
)

export const deleteUser = createAsyncThunk(
    "deleteUser", async (userId) => {
        const token = window.localStorage.getItem(TOKEN);
        try{
            const {data} = await axios.delete(`/api/admin/${userId}`, {
                headers: {
                    authorization: token
                }
            })
            return data
        } catch (err) {
            console.log(err)
        }
    }
)

const allUsersSlice = createSlice({
    name: "allUsers",
    initialState: {
        userList: []
    },

    extraReducers: (builder) => {
        builder.addCase(fetchAllUsers.fulfilled, (state, action)=> {
            state.userList = action.payload
        }),
        builder.addCase(fetchAllUsers.rejected, (state, action)=> {
            console.log("Rejected")
        }),
        builder.addCase(deleteUser.fulfilled, (state, action)=> {
            const currentUsers = state.userList
            const userId = action.payload.id
            const newList = currentUsers.filter((user) => {
                return user.id !== userId
            })
            state.userList = [...newList]
        })
    }
})

export default allUsersSlice.reducer