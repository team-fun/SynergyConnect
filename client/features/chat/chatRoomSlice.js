import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchChatRoomChats = createAsyncThunk(
  'chat/fetchChatRoomChats',
  async ({ code, messageData }) => {
    try {
      const { data } = await axios.post(`/api/chat/${code}/save-history`, {
        messageData
      });
      console.log("This is data from chatRoomSlice", data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const chatRoomSlice = createSlice({
  name: 'chat',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchChatRoomChats.fulfilled, (state, action) => {
      return [...state, action.payload];
    });
  },
});

export default chatRoomSlice.reducer;


