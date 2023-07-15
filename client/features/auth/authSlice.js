import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/*
  CONSTANT VARIABLES
*/
const TOKEN = "token";

/*
  THUNKS
*/
export const me = createAsyncThunk("auth/me", async () => {
  const token = window.localStorage.getItem(TOKEN);
  try {
    if (token) {
      const res = await axios.get("/auth/me", {
        headers: {
          authorization: token,
        },
      });
      return res.data;
    } else {
      return {};
    }
  } catch (err) {
    if (err.response.data) {
      return thunkAPI.rejectWithValue(err.response.data);
    } else {
      return "There was an issue with your request.";
    }
  }
});

export const authenticate = createAsyncThunk(
  "auth/authenticate",
  async (
    { username, password, email, firstName, lastName, method },
    thunkAPI
  ) => {
    try {
      let postData = { username, password };
      if (method === "signup") {
        postData.email = email;
        postData.firstName = firstName;
        postData.lastName = lastName;
      }
      const res = await axios.post(`/auth/${method}`, postData);
      window.localStorage.setItem(TOKEN, res.data.token);
      thunkAPI.dispatch(me());
    } catch (err) {
      if (err.response.data) {
        return thunkAPI.rejectWithValue(err.response.data);
      } else {
        return "There was an issue with your request.";
      }
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (state, action) => {
  await fetch("/auth/logout", {
    headers: {
      authorization: localStorage.token,
    },
  });
});

/*
  SLICE
*/
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    me: {},
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(me.fulfilled, (state, action) => {
      state.me = action.payload;
    });
    builder.addCase(me.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(authenticate.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      window.localStorage.removeItem(TOKEN);
      state.me = {};
      state.error = null;
    });
  },
});

/*
  ACTIONS
*/

export const selectUser = (state) => state.auth;

/*
  REDUCER
*/
export default authSlice.reducer;
