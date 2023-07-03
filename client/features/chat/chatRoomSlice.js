import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOldChats = createAsyncThunk(
  "chats/fetchOldChats",
  async (code) => {
    try {
      const { data } = await axios.get(`/api/chats/${code}`);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const sendNewChats = createAsyncThunk(
  "chats/sendNewChats",
  async ({ code, newMesssage }) => {
    try {
      const { data } = await axios.post(`/api/chats/${code}/save-history`, {
        newMesssage,
      });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const chatRoomSlice = createSlice({
  name: "chat",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOldChats.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(sendNewChats.fulfilled, (state, action) => {
      console.log("Message sent successfully");
    });
  },
});

export default chatRoomSlice.reducer;
