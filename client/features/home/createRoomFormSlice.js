import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

export const fetchCreateRoomAsync = createAsyncThunk(
  "createRoomAsync",
  async ({ name, code, description, isPublic }) => {
    try {
      const { data } = await axios.post("/api/createroom", {
        name: name,
        code: code,
        description: description,
        isPublic: isPublic,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const createRoomSlice = createSlice({
  name: "createRoom",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCreateRoomAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectCreatedRoom = (state) => {
  return state.createRoom;
};

export default createRoomSlice.reducer;
