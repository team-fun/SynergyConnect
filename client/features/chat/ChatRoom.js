import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

/**
 * COMPONENT
 */
const ChatRoom = () => {
  const username = useSelector((state) => state.auth.me.username);
  const dispatch = useDispatch();
  const { code } = useParams();

  console.log("HELLOOO THIS WAS SUPPOSTED TO WORK");

  return (
    <div>
      <h1>YOU MADE IT</h1>
    </div>
  );
};

export default ChatRoom;
