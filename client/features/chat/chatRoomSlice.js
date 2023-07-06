import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOldChats = createAsyncThunk(
  "chats/fetchOldChats",
  async ({ code, id }) => {
    try {
      console.log(code, id);
      const { data } = await axios.get(`/api/chats/${code}`, { id });
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

export const deleteUserFromRoom = createAsyncThunk(
  "deleteUserFromRoom",
  async ({ code, id }) => {
    try {
      const { data } = await axios.delete(`/api/chats/${code}/${id}`, { id });
      return data;
    } catch (error) {
      console.log(error);
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
    builder.addCase(deleteUserFromRoom.fulfilled, (state, action) => {
      const newState = state.filter((user) => user.id !== action.payload);
      return newState;
    });
  },
});

export default chatRoomSlice.reducer;
