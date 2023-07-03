import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { sendNewChats } from "./chatRoomSlice";

/**
 * COMPONENT
 */
const ChatRoom = ({ socket, username }) => {
  const dispatch = useDispatch();
  const { code } = useParams();
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const pastMessages = useSelector((state) => state.chat);
  console.log(pastMessages);

  const sendMessage = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
    const messageId = Math.floor(Math.random() * 3587);

    const messageData = {
      id: messageId,
      code: code,
      username: username,
      message: message,
      time: formattedTime,
    };

    socket.emit("send_message", messageData);
    setMessageList((list) => [...list, messageData]);
    setMessage("");

    dispatch(sendNewChats({ code, messageData }));
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("YOOOOOOOOOOOOOOO", data);
      setMessageList((list) => {
        const newList = [...list];
        const existingMessage = newList.find(
          (message) =>
            message.username === data.username &&
            message.message === data.message
        );
        if (!existingMessage) {
          newList.push(data);
        }
        return newList;
      });
    });

    socket.emit("join_room", { code, username });

    return () => {
      socket.off("receive_message");
    };
  }, [socket, code, username]);

  return (
    <div>
      <header>
        <p>Welcome to {code}</p>
        <span>
          <button>Join video call</button>
        </span>
      </header>
      <div>
        <section>
          <h3
            style={{
              textAlign: "center",
              borderBottom: "3px solid rgb(25, 25, 25)",
            }}
          >
            Start of chat history
          </h3>
          {messageList.map((data) => {
            return (
              <div
                key={data.id}
                id={username === data.username ? "you" : "other"}
              >
                <div>
                  <p>{data.username}:</p>
                  <span>{data.message}</span>
                  <span>{data.time}</span>
                </div>
              </div>
            );
          })}
        </section>
      </div>
      <footer>
        <input
          type="text"
          value={message}
          placeholder="Type here..."
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyUp={(e) => {
            e.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>send</button>
      </footer>
    </div>
  );
};

export default ChatRoom;
