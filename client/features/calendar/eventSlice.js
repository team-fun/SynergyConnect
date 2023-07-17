import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

export const fetchEventAsync = createAsyncThunk(
  "events/fetchEventsAsync",
  async () => {
    try {
      const { data } = await axios.get("/api/events");
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addEventAsync = createAsyncThunk(
  "events/addEventAsync",
  async ({ title, start, end, userId }) => {
    try {
      const { data } = await axios.post("/api/events", {
        title: title,
        start: start,
        end: end,
        userId: userId,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteEventAsync = createAsyncThunk(
  "events/deleteEventAsync",
  async (title) => {
    try {
      const { data } = await axios.delete(`/api/events/${title}`);
      return data;
    } catch (error) {
      console.log();
    }
  }
);


const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEventAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addEventAsync.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(deleteEventAsync.fulfilled, (state, action) => {
      const deleteEventId = action.payload;
      const newState = state.filter((event) => event.id !== deleteEventId);
      return newState;
    });
  },
});

export default eventSlice.reducer;
