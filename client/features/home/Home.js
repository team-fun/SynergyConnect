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
  const [filter, setFilter] = useState([]);
  const [code, setCode] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllChats());
  }, [dispatch]);

  useEffect(() => {
    if (chats) {
      setFilter(chats.filter((chat) => chat.public));
    }
  }, [chats]);

  const create = () => {
    setCreateFormVis(true);
  };

  const publicFilter = () => {
    setFilter(chats.filter((chat) => chat.public));
  };

  const privateFilter = () => {
    setFilter(chats.filter((chat) => !chat.public));
  };

  const joinRoom = (evt) => {
    evt.preventDefault();
    setCode("");
  };

  return (
    <div>
      {createFormVis ? (
        <>
          <CreateRoomForm />
          <button onClick={() => setCreateFormVis(false)}>Back</button>
        </>
      ) : (
        <section>
          <h3>Welcome, {username}</h3>
          <button onClick={create}>Create Room</button>
          <input
            placeholder="Enter Room Code"
            onChange={(e) => setCode(e.target.value)}
          ></input>
          <button onClick={joinRoom}>Join Room</button>
          <div>
            <button onClick={publicFilter}>Public Rooms</button>
            <button onClick={privateFilter}>Private Rooms</button>
          </div>
          <div>
            {filter.map((chat) => {
              return (
                <div key={chat.id}>
                  <h1>{chat.name}</h1>
                  <Link to={`/chats/${chat.code}`}>
                    <button>CLICK ME</button>
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
