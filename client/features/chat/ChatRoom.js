import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  sendNewChats,
  fetchOldChats,
  deleteUserFromRoom,
} from "./chatRoomSlice";
import { fetchAllChats } from "../home/AllChatsSlice";
import VideoCall from "./videoCall";
import Whiteboard from "./WhiteBoard/Whiteboard";
import { useNavigate } from "react-router-dom";

/**
 * COMPONENT
 */
const ChatRoom = ({ socket, username }) => {
  const dispatch = useDispatch();
  const { code } = useParams();
  const id = useSelector((state) => state.auth.me.id);
  const [message, setMessage] = useState("");
  const [userList, setUserList] = useState([]);
  const { messages, chat } = useSelector((state) => state.chat);
  const [messageList, setMessageList] = useState([]);
  const [showCode, setShowCode] = useState(false);
  const [showWhiteboard, setShowWhiteboard] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [chatName, setChatName] = useState("the Chat");

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
    socket.emit("request_user_list", code);

    socket.on("user_list", (users) => {
      let uniqUsers = [];
      for (let i = 0; i < users.length; i++) {
        if (!uniqUsers.some((user) => user.id === users[i].id)) {
          uniqUsers.push(users[i]);
        }
      }
      setUserList(uniqUsers);
    });

    return () => {
      socket.off("receive_message");
      socket.off("user_list");
    };
  }, [socket, code, username, id]);

  useEffect(() => {
    if (messages) {
      setMessageList(messages);
    }
  }, [messages]);

  useEffect(() => {
    if (chat) {
      setChatName(chat.name);
    }
  }, [chat]);

  const handleClick = () => {
    setShowVideoCall(!showVideoCall);
  };

  const handleClickWB = () => {
    setShowWhiteboard(!showWhiteboard);
  };

  const navigate = useNavigate();

  const leaveRoom = () => {
    socket.emit("leave_room", code);
    dispatch(fetchAllChats(id));
    navigate("/home");
  };

  const handleDelete = () => {
    socket.emit("leave_room", code);
    dispatch(deleteUserFromRoom({ id, code }));
    navigate("/home");
  };

  const handleView = () => {
    setShowCode(!showCode);
  };

  return (
    <div className="w-full h-full">
      <header>
        <p className=" text-[30px] text-center">Welcome to {chatName} Room</p>
        <div>
          <button onClick={leaveRoom}>Back</button>
          <button style={{ backgroundColor: "red" }} onClick={handleDelete}>
            Disconnect
          </button>
          <button onClick={handleView}>View Code</button>
          <span>{showCode ? code : ""}</span>
        </div>

        <div className="flex">
          <section className="w-1/2 mr-2 bg-white rounded-lg p-4">
            <button onClick={handleClick}>
              {showVideoCall ? "Exit Video Call" : "Connect to Video Call"}
            </button>
            {showVideoCall && <VideoCall code={code} username={username} />}
          </section>
          <section className="w-1/2 ml-2 bg-white rounded-lg p-4">
            <button onClick={handleClickWB}>
              {showWhiteboard ? "Exit WhiteBoard" : "Connect to WhiteBoard"}
            </button>
            {showWhiteboard && <Whiteboard socket={socket} />}
          </section>
        </div>


      </header>
      <div className="grid grid-cols-5 h-[60vh] ">
        <section
          style={{ background: "#D9D9D9" }}
          className="col-span-4 h-full px-4 py-2 mr-1 my-2 rounded-lg chatRoom"
        >
          <h3
            style={{
              textAlign: "center",
              borderBottom: "3px solid rgb(25, 25, 25)",
            }}
            className="keepDark"
          >
            Start of chat history
          </h3>
          {messageList.map((data) => {
            return (
              <div
                key={data.id}
                id={username === data.username ? "you" : "other"}
              >
                <div className="keepDark">
                  <p>{data.username}:</p>
                  <span style={{ overflowWrap: "break-word" }}>
                    {data.message}
                  </span>
                  <span style={{ marginLeft: "5px" }}>{data.time}</span>
                </div>
              </div>
            );
          })}
        </section>
        <section
          style={{ background: "#D9D9D9" }}
          className="col-span-1 h-full  px-4 py-2 mx-1 my-2 rounded-lg keepDark userView"
        >
          <h4 className="keepDark">Users in this room: </h4>
          {userList.map((user) => {
            return (
              <p className="keepDark" key={user.id}>
                {user.username}
              </p>
            );
          })}
        </section>
      </div>
      <div className="text-center mt-6 w-[80%]">
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
      </div>
    </div>
  );
};

export default ChatRoom;
