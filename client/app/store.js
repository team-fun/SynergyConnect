import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import createRoomFormSlice from "../features/home/createRoomFormSlice";
import AllChatsSlice from "../features/home/AllChatsSlice";
import allUsersSlice from "../features/admin/adminViewSlice";
import editUserSlice from "../features/admin/editUserSlice";
import AllFriendsSlice from "../features/home/AllFriendsSlice";
import AllNonFriendsSlice from "../features/home/AllNonFriendsSlice";
import chatRoomSlice from "../features/chat/chatRoomSlice";
import whiteboardSliceReducer from "../features/chat/WhiteBoard/whiteboardSlice";
import cursorSliceReducer from "../features/chat/WhiteBoard/CursorOverlay/cursorSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    allUsers: allUsersSlice,
    editUser: editUserSlice,
    createRoom: createRoomFormSlice,
    chats: AllChatsSlice,
    friends: AllFriendsSlice,
    notFriends: AllNonFriendsSlice,
    chat: chatRoomSlice,
    whiteboard: whiteboardSliceReducer,
    cursor: cursorSliceReducer,
  },
  middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware({
    serializableCheck: {
      ignoreActions: ['whiteboard/setElements'],
      ignoredPaths: ['whiteboard.elements'],
    },
  }),
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
