import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CreateRoomForm from "./CreateRoomForm";
import {
  selectFriends,
  fetchAllFriends,
  acceptRejectRequest,
} from "./AllFriendsSlice";
import {
  selectChats,
  fetchAllChats,
  asyncJoinRoom,
  favoriteRoom,
} from "./AllChatsSlice";
import SearchBox from "../seachbar/SearchBar";

const Home = (props) => {
  const [friendListChange, setfriendListChange] = useState(false);
  const [showFriends, setShowFriends] = useState(false);
  const id = useSelector((state) => state.auth.me.id);
  const username = useSelector((state) => state.auth.me.username);
  const results = useSelector(selectChats);
  const { chats, participating, allParticipants } = results;
  const friends = useSelector(selectFriends) || [];
  const [createFormVis, setCreateFormVis] = useState(false);
  const [filter, setFilter] = useState([]);
  const [code, setCode] = useState("");
  const [favoriteStatus, setFavoriteStatus] = useState({});
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllChats(id));
    dispatch(fetchAllFriends({ id }));
  }, [dispatch, friendListChange, id]);

  useEffect(() => {
    if (participating && chats) {
      const newFavoriteStatus = {};
      participating.forEach((info) => {
        const chatId = info.chatId;
        const chat = chats.find((chat) => chat.id === chatId);
        if (chat) {
          const isFavorite = info.favorite;
          newFavoriteStatus[chatId] = isFavorite;
        }
      });
      setFavoriteStatus(newFavoriteStatus);
    }
  }, [participating, chats]);

  const handleFriendListChange = () => {
    setfriendListChange(!friendListChange);
  };

  const toggleFriendsList = () => {
    setShowFriends(!showFriends);
  };

  const create = () => {
    setCreateFormVis(true);
  };

  const handleAcceptRejectRequest = (friendID, action) => {
    dispatch(
      acceptRejectRequest({
        loggedInUserId: id,
        otherFriendId: friendID,
        action,
      })
    );
    setTimeout(handleFriendListChange, 1000);
  };

  const publicFilter = () => {
    setFilter(chats.filter((chat) => chat.public));
  };

  const privateFilter = () => {
    setFilter(chats.filter((chat) => !chat.public));
  };

  const favFilter = () => {
    setFilter(
      chats.filter(
        (chat) =>
          participating?.find((info) => info.chatId === chat.id) &&
          (favoriteStatus[chat.id] || false)
      )
    );
  };

  const joinRoom = (evt) => {
    dispatch(asyncJoinRoom({ code, id }));
    setCode("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      joinRoom();
    }
  };

  const onSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const onFavorite = (event, isParticipating) => {
    event.preventDefault();
    const chatId = isParticipating.chatId;
    const oldFav = favoriteStatus[chatId] || false;
    const newFav = !oldFav;
    dispatch(favoriteRoom({ newFav, isParticipating }));
    setFavoriteStatus((prevStatus) => ({ ...prevStatus, [chatId]: newFav }));
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
            onKeyUp={handleKeyPress}
          ></input>
          <button onClick={joinRoom}>Join Room</button>
          <div>
            <button onClick={publicFilter}>Public Rooms</button>
            <button onClick={privateFilter}>Private Rooms</button>
            <button onClick={favFilter}>Favorites⭐</button>
          </div>
          <SearchBox searchChange={onSearchChange} />
          <div>
            {filter
              .filter((chat) =>
                chat.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((chat) => {
                const isParticipating = participating?.find(
                  (info) => info.chatId === chat.id
                );
                const participants = allParticipants.filter(
                  (participant) => participant.chatId === chat.id
                );
                const chatId = chat.id;
                const fav = favoriteStatus[chatId] || false;

                return (
                  <div key={chat.id}>
                    <h1>{chat.name}</h1>
                    <p>{chat.description}</p>
                    <p>👤 {participants.length}</p>
                    <Link to={`/chats/${chat.code}`}>
                      <button>Join Room</button>
                    </Link>
                    {isParticipating ? (
                      fav ? (
                        <span
                          onClick={(event) =>
                            onFavorite(event, isParticipating)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          ❤️
                        </span>
                      ) : (
                        <span
                          onClick={(event) =>
                            onFavorite(event, isParticipating)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          🖤
                        </span>
                      )
                    ) : (
                      <p>Join once before favoriting!</p>
                    )}
                  </div>
                );
              })}
          </div>
        </section>
      )}
      <div>
        <button
          onClick={toggleFriendsList}
        >{`${friends.length} Friends`}</button>
        {showFriends && (
          <div>
            {friends.length === undefined || friends?.length === 0 ? (
              <div>No friends</div>
            ) : (
              <div>
                {friends.map((friend, i) => (
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
