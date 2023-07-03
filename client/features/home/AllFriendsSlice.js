import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllFriends = createAsyncThunk(
  "getAllFriends",
  async ({ id }) => {
    try {
      const { data } = await axios.get(`/api/friends/${id}`);
      console.log(data);
      return data.friends;
    } catch (error) {
      console.error(error);
    }
  }
);

const friendsSlice = createSlice({
  name: "friends",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllFriends.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectFriends = (state) => {
  console.log(state);
  return state.friends;
};

export default friendsSlice.reducer;
