import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CreateRoomForm from "./CreateRoomForm";
import { selectChats, fetchAllChats } from "./AllChatsSlice";

/**
 * COMPONENT
 */
const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);
  const chats = useSelector(selectChats);
  const [createFormVis, setCreateFormVis] = useState(false);
  const dispatch = useDispatch();

  console.log("THIS IS CHATS", chats);

  useEffect(() => {
    dispatch(fetchAllChats());
  }, [dispatch]);

  const create = () => {
    setCreateFormVis(true);
  };

  return (
    <div>
      {createFormVis ? (
        <>
          <CreateRoomForm />
          <button onClick={() => setCreateFormVis(false)}>Back</button>
        </>
      ) : (
        <>
          <h3>Welcome, {username}</h3>
          <button onClick={create}>Create Room</button>
          <div>
            {chats.map((chat) => {
              return (
                <div key={chat.id}>
                  <h1>{chat.name}</h1>
                  <Link to="/chat">
                    <button>Join Room</button>
                  </Link>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
