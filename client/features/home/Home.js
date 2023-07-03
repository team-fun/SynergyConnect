import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CreateRoomForm from "./CreateRoomForm";
import { selectChats, fetchAllChats } from "./AllChatsSlice";
import { selectFriends, fetchAllFriends } from "./AllFriendsSlice";

/**
 * COMPONENT
 */
const Home = (props) => {
  const id = useSelector((state) => state.auth.me.id);
  console.log(id);
  const username = useSelector((state) => state.auth.me.username);
  const chats = useSelector(selectChats);
  const friends = useSelector(selectFriends) || [];
  const [createFormVis, setCreateFormVis] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllChats());
    dispatch(fetchAllFriends({ id }));
  }, [dispatch]);

  const create = () => {
    setCreateFormVis(true);
  };
  console.log(chats, friends);
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
                  <Link to={`/chat/${chat.code}`}>
                    <button>CLICK ME</button>
                  </Link>
                </div>
              );
            })}
          </div>
        </>
      )}
      <div>
        <button>Friends</button>
        {friends.length === undefined || friends?.length == 0 ? (
          <div>No friends</div>
        ) : (
          <div>
            {friends?.map((friend, i) => (
              <div key={i}>
                {friend.dataValues.username}{" "}
                <span>{friend.pending ? "pending" : "friend"}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
