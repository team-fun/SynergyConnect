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

export const favoriteRoom = createAsyncThunk(
  "favoriteRoom",
  async ({ newFav, isParticipating }) => {
    const favorite = newFav;
    try {
      const { data } = await axios.put(`/api/chats`, {
        favorite,
        isParticipating,
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

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
    builder.addCase(favoriteRoom.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectChats = (state) => {
  return state.chats;
};

export default chatsSlice.reducer;
