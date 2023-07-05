import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllChats = createAsyncThunk("getAllChatRooms", async (id) => {
  try {
    const { data } = await axios.get(`/api/chats?id=${id}`);
    return data;
  } catch (error) {
    console.error(error);
  }
});

export const asyncJoinRoom = createAsyncThunk(
  "joinRoom",
  async ({ code, id }) => {
    try {
      const { data } = await axios.post(`/api/chats/${code}`, { id });
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

// export const deleteUserFromRoom = createAsyncThunk(
//   "deleteUserFromRoom",
//   async ({ code, id }) => {
//     try {
//       const { data } = await axios.delete(`/api/chats/${code}/${id}`, { id } );
//       return data;
      
//     } catch (error) {
//       console.log(error);
//     }
//   }
// )

const chatsSlice = createSlice({
  name: "chats",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllChats.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(asyncJoinRoom.fulfilled, (state, action) => {
      return action.payload;
    });
    // builder.addCase(deleteUserFromRoom.fulfilled, (state, action) => {
    //   const newState = state.filter((user) => user.id !== action.payload)
    //   return newState
    // })
  },
});

export const selectChats = (state) => {
  return state.chats;
};

export default chatsSlice.reducer;
