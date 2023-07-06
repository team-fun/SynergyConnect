import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllFriends = createAsyncThunk(
  "getAllFriends",
  async ({ id }) => {
    try {
      const { data } = await axios.get(`/api/friends/${id}`);
      //console.log(" this is friends from slice", data);
      return data.friends;
    } catch (error) {
      console.error(error);
    }
  }
);

export const sendFriendRequest = createAsyncThunk(
  "sendFriendRequest",
  async ({ loggedInUserId, otherFriendId }) => {
    let postData = { loggedInUserId, otherFriendId };

    try {
      const data = await axios.post(`/api/friends/`, postData);
      //console.log("data for adding friend", data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);
export const acceptRejectRequest = createAsyncThunk(
  "acceptRejectRequest",
  async ({ loggedInUserId, otherFriendId, action }) => {
    let putData = { loggedInUserId, otherFriendId, action };

    try {
      const data = await axios.put(`/api/friends/acceptRejectRequest`, putData);
      //console.log(data);
      return data;
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
  //console.log("FRIEND SLICE 57",state);
  return state.friends;
};


export default friendsSlice.reducer;
