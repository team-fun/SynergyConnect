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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllChats());
  }, [dispatch]);

  const create = () => {
    setCreateFormVis(true);
  };


  const publicFilter = () => {
    setFilter(chats.filter((chat) => chat.public))
  }

  const privateFilter = () => {
    setFilter(chats.filter((chat) => !chat.public))
  }


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
            <button onClick={publicFilter}>Public Rooms</button>
            <button onClick={privateFilter}>Private Rooms</button>
          </div>
          <div>
            {filter.map((chat) => {
              return (
                <div key={chat.id}>
                  <h1>{chat.name}</h1>
                  <Link to={`/chat/${chat.code}`}>
                    <button>CLICK ME</button>
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
