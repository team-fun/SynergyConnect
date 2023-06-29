import React, { useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001/");

/**
 * COMPONENT
 */
const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);
  const [room, setRoom] = useState("");

  const joinRoom = () => {};

  return (
    <div>
      <h3>Welcome, {username}</h3>
      <button onClick={joinRoom}>Create A Room</button>
    </div>
  );
};

export default Home;
