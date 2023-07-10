import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllNonFriends = createAsyncThunk(
  "getAllNonFriends",
  async ({ id }) => {
    try {
      const { data } = await axios.get(`/api/friends/notFriends/${id}`);
     
      return data.nonFriends;
    } catch (error) {
      console.error(error);
    }
  }
);

const nonFriendsSlice = createSlice({
  name: "nonFriends",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllNonFriends.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectNonFriends = (state) => {
  //console.log(state);
  return state.notFriends;
};

export default nonFriendsSlice.reducer;
