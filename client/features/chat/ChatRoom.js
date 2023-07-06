import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  sendNewChats,
  fetchOldChats,
  deleteUserFromRoom,
} from "./chatRoomSlice";
import VideoCall from "./videoCall";
import { useNavigate } from "react-router-dom";

/**
 * COMPONENT
 */
const ChatRoom = ({ socket, username }) => {
  const dispatch = useDispatch();
  const { code } = useParams();
  const id = useSelector((state) => state.auth.me.id);
  const [message, setMessage] = useState("");
  const pastMessages = useSelector((state) => state.chat);
  const [messageList, setMessageList] = useState([]);

  const sendMessage = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
    const messageId = Math.floor(Math.random() * 3587);

    const newMesssage = {
      id: messageId,
      code: code,
      username: username,
      message: message,
      time: formattedTime,
    };

    socket.emit("send_message", newMesssage);
    setMessageList((list) => [...list, newMesssage]);
    dispatch(sendNewChats({ code, newMesssage }));
    setMessage("");
  };

  useEffect(() => {
    dispatch(fetchOldChats({ code, id }));
    socket.on("receive_message", (data) => {
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

  useEffect(() => {
    if (pastMessages) {
      setMessageList(pastMessages);
    }
  }, [pastMessages]);

  const [videoCall, setVideoCall] = useState(false);

  const handleClick = () => {
    if (videoCall) {
      setVideoCall(false);
    }
    setVideoCall(true);
  };

  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(deleteUserFromRoom({ id, code }));
    navigate("/home");
  };

  return (
    <div>
      <header>
        <p>Welcome to {code}</p>
        <div>
          <button onClick={handleClick}>Start Video Call</button>
          {videoCall && <VideoCall code={code} username={username} />}
        </div>
        <div>
          <Link to={`/home/`}>
            <button>Back</button>
          </Link>
          <button style={{ backgroundColor: "red" }} onClick={handleDelete}>
            Leave Chat Room
          </button>
        </div>
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
