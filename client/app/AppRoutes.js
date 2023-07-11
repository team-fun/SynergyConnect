import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import Home from "../features/home/Home";
import AdminView from "../features/admin/AdminView";
import { me } from "./store";
import { selectUser } from "../features/auth/authSlice";
import EditUser from "../features/admin/EditUser";
import UserView from "../features/userView/userView";
import ChatRoom from "../features/chat/ChatRoom";
import ContactUs from "../features/ContactUs/ContactUs";
// import WhiteBoard from "../features/chat/WhiteBoard/WhiteBoard";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001/");
import Friends from "../features/friends/Friends";
import NonFriends from "../features/friends/NonFriends";

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const username = useSelector((state) => state.auth.me.username);
  const user = useSelector(selectUser);
  const isAdmin = user.me.isAdmin;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div className="w-full">
      {isLoggedIn ? (
        isAdmin ? (
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route to="/home" element={<Home />} />
            <Route path="/friends" element={<NonFriends />} />
            <Route path="/admin" element={<AdminView />} />
            <Route path="/admin/:id" element={<EditUser />} />
            <Route
              path="/chats/:code"
              element={<ChatRoom socket={socket} username={username} />}
            />
            {/* <Route path="/whiteboard" element={<WhiteBoard />} /> */}
            <Route path="/profile" element={<UserView />} />
            <Route path="/profile/:id" element={<UserView />} />
            <Route path="/contactus" element={<ContactUs />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route to="/home" element={<Home />} />
            <Route path="/friends" element={<NonFriends />} />
            <Route
              path="/chats/:code"
              element={<ChatRoom socket={socket} username={username} />}
            />
            {/* <Route path="/whiteboard" element={<WhiteBoard />} /> */}

            <Route path="/profile" element={<UserView />} />
            <Route path="/profile/:id" element={<UserView />} />
            <Route path="/contactus" element={<ContactUs />} />
          </Routes>
        )
      ) : (
        <Routes>
          <Route
            path="/*"
            element={<AuthForm name="login" displayName="Login" />}
          />

          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<AuthForm name="signup" displayName="Sign Up" />}
          />
          <Route path="/ContactUs" element={<ContactUs />} />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
