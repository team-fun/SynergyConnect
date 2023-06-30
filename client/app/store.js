import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import createRoomFormSlice from "../features/home/createRoomFormSlice";
import AllChatsSlice from "../features/home/AllChatsSlice";
import allUsersSlice from "../features/admin/adminViewSlice";
import editUserSlice from "../features/admin/editUserSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    allUsers: allUsersSlice,
    editUser: editUserSlice,
    createRoom: createRoomFormSlice,
    chats: AllChatsSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
