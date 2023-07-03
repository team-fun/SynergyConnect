import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllChats = createAsyncThunk("getAllChatRooms", async (id) => {
  try {
    const { data } = await axios.get(`/api/chats/${id}`);
    return data;
  } catch (error) {
    console.error(error);
  }
});

export const asyncJoinRoom = createAsyncThunk("joinRoom", async (code) => {
  try {
    const { data } = await axios.post(`/api/chats/${code}`);
    return data;
  } catch (error) {
    console.error(error);
  }
});

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
  },
});

export const selectChats = (state) => {
  return state.chats;
};

export default chatsSlice.reducer;
