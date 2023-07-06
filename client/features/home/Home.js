import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CreateRoomForm from "./CreateRoomForm";
import {
  sendFriendRequest,
  selectFriends,
  fetchAllFriends,
  acceptRejectRequest,
} from "./AllFriendsSlice";
import { fetchAllNonFriends, selectNonFriends } from "./AllNonFriendsSlice";
import { selectChats, fetchAllChats, asyncJoinRoom } from "./AllChatsSlice";
import SearchBox from "../seachbar/SearchBar";
/**
 * COMPONENT
 */
const Home = (props) => {
  const [friendListChange, setfriendListChange] = useState(false);
  const id = useSelector((state) => state.auth.me.id);
  const username = useSelector((state) => state.auth.me.username);
  const chats = useSelector(selectChats);
  const friends = useSelector(selectFriends) || [];
  const nonFriends = useSelector(selectNonFriends) || [];
  const [createFormVis, setCreateFormVis] = useState(false);
  const [filter, setFilter] = useState([]);
  const [code, setCode] = useState("");
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  console.log(chats);

  useEffect(() => {
    dispatch(fetchAllChats(id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllFriends({ id }));
    dispatch(fetchAllNonFriends({ id }));
  }, [dispatch, friendListChange]);

  const handleFriendListChange = () => {
    setfriendListChange(!friendListChange);
  };

  useEffect(() => {
    if (chats) {
      setFilter(chats.filter((chat) => chat.public));
    }
  }, [chats]);

  const create = () => {
    setCreateFormVis(true);
  };

  const handleSendRequest = (friendID) => {
    dispatch(
      sendFriendRequest({
        loggedInUserId: id,
        otherFriendId: friendID,
      })
    );

    setTimeout(() => {
      handleFriendListChange();
    }, 1000);
  };

  const handleAcceptRejectRequest = (friendID, action) => {
    dispatch(
      acceptRejectRequest({
        loggedInUserId: id,
        otherFriendId: friendID,
        action: action,
      })
    );

    setTimeout(() => {
      handleFriendListChange();
    }, 1000);
  };

  const publicFilter = () => {
    setFilter(chats.filter((chat) => chat.public));
  };

  const privateFilter = () => {
    setFilter(chats.filter((chat) => !chat.public));
  };

  const joinRoom = (evt) => {
    evt.preventDefault();
    dispatch(asyncJoinRoom({ code, id }));
    setCode("");
  };

  const onSearchChange = (event) => {
    setSearch(event.target.value);
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
          <SearchBox searchChange={onSearchChange} />
          <div>
            {filter
              .filter((chat) => {
                const chatName = chat.name.toLowerCase();
                return chatName.includes(search.toLocaleLowerCase());
              })
              .map((chat) => {
                return (
                  <div key={chat.id}>
                    <h1>{chat.name}</h1>
                    <button>Favorite</button>
                    <Link to={`/chats/${chat.code}`}>
                      <button>Join Room</button>
                    </Link>
                  </div>
                );
              })}
          </div>
        </section>
      )}
      <div>
        <button>Friends</button>
        {friends.length === undefined || friends?.length == 0 ? (
          <div>No friends</div>
        ) : (
          <div>
            {friends?.map((friend, i) => (
              <div key={i}>
                {friend.dataValues.username}
                <span>
                  {friend.pending ? (
                    friend.sent ? (
                      <button
                        onClick={() =>
                          handleAcceptRejectRequest(
                            friend?.dataValues?.id,
                            "reject"
                          )
                        }
                      >
                        Cancel Request
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() =>
                            handleAcceptRejectRequest(
                              friend?.dataValues?.id,
                              "accept"
                            )
                          }
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            handleAcceptRejectRequest(
                              friend?.dataValues?.id,
                              "reject"
                            )
                          }
                        >
                          Reject
                        </button>
                      </>
                    )
                  ) : (
                    <button
                      onClick={() =>
                        handleAcceptRejectRequest(
                          friend?.dataValues?.id,
                          "reject"
                        )
                      }
                    >
                      Remove Friend
                    </button>
                  )}
                </span>
              </div>
            ))}
          </div>
        )}
        {nonFriends.length === undefined || nonFriends?.length == 0 ? (
          <div>All Users are friends</div>
        ) : (
          <div>
            {nonFriends?.map((nonFriend, i) => (
              <div key={i}>
                {nonFriend.username}{" "}
                <button onClick={() => handleSendRequest(nonFriend.id)}>
                  +
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
