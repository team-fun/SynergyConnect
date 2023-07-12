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
import CalendarSchedule from "../calendar/Calendar";
import Friends from "../friends/Friends";
import { ChangeHistorySharp } from "@mui/icons-material";

const Home = () => {
  const [friendListChange, setfriendListChange] = useState(false);
  const [showFriends, setShowFriends] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const id = useSelector((state) => state.auth.me.id);
  const username = useSelector((state) => state.auth.me.username);
  const results = useSelector(selectChats);
  const { chats, participating, allParticipants } = results;
  const friends = useSelector(selectFriends) || [];
  const [createFormVis, setCreateFormVis] = useState(false);
  const [filter, setFilter] = useState([]);
  const [code, setCode] = useState("");
  const [search, setSearch] = useState("");
  const [favoriteStatus, setFavoriteStatus] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllChats(id));
    dispatch(fetchAllFriends({ id }));
  }, [dispatch, friendListChange, id]);

  useEffect(() => {
    if (participating && chats) {
      setFilter(chats.filter((chat) => chat.public));

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

  useEffect(() => {
    if (chats) {
      setFilter(chats);
    }
  }, [chats]);

  const toggleFriendsList = () => {
    setShowFriends(!showFriends);
  };

  const create = () => {
    setCreateFormVis(true);
  };

  const allFilter = () => {
    setFilter(chats);
    setActiveTab("all");
  };

  const publicFilter = () => {
    setFilter(chats.filter((chat) => chat.public));
    setActiveTab("public");
  };

  const privateFilter = () => {
    setFilter(chats.filter((chat) => !chat.public));
    setActiveTab("private");
  };

  const favFilter = () => {
    setFilter(
      chats.filter(
        (chat) =>
          participating?.find((info) => info.chatId === chat.id) &&
          (favoriteStatus[chat.id] || false)
      )
    );
    setActiveTab("fav");
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
    https: setFavoriteStatus((prevStatus) => ({
      ...prevStatus,
      [chatId]: newFav,
    }));
  };

  return (
    <div>
      {/* <CalendarSchedule /> */}
      {createFormVis ? (
        <>
          <CreateRoomForm />
          <button onClick={() => setCreateFormVis(false)}>Back</button>
        </>
      ) : (
        <section>
          <div className="py-10 w-full px-5 flex items-center justify-between">
            <div>
              <h3 className="text-5xl">Welcome, {username}</h3>
              <p className="font-medium"> Its good to see you</p>
            </div>
            <div>
              <div>
                <div>
                  <button
                    onClick={toggleFriendsList}
                  >{`${friends.length} Friends`}</button>
                </div>
                {showFriends && <Friends />}
              </div>
            </div>
          </div>
          <button onClick={create}>Create Room</button>
          <input
            placeholder="Enter Room Code"
            onChange={(e) => setCode(e.target.value)}
            onKeyUp={handleKeyPress}
          ></input>
          <button onClick={joinRoom}>Join Room</button>
          <div>
            <h3 className="text-3xl">Chat Rooms</h3>
            <SearchBox searchChange={onSearchChange} />

            <div className="flex">
              <h3
                className={`mr-4 ${
                  activeTab === "all" ? "activeHomeTab" : "nonActiveHomeTab"
                }`}
                onClick={allFilter}
              >
                All Chats
              </h3>
              <h3
                className={`mx-4 ${
                  activeTab === "public" ? "activeHomeTab" : "nonActiveHomeTab"
                }`}
                onClick={publicFilter}
              >
                Public Rooms
              </h3>
              <h3
                className={`mx-4 ${
                  activeTab === "private" ? "activeHomeTab" : "nonActiveHomeTab"
                }`}
                onClick={privateFilter}
              >
                Private Rooms
              </h3>
              <h3
                className={`mx-4 ${
                  activeTab === "fav" ? "activeHomeTab" : "nonActiveHomeTab"
                }`}
                onClick={favFilter}
              >
                Favorites⭐
              </h3>
            </div>
          </div>
          <div>
            {filter
              .filter((chat) =>
                chat.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((chat, i) => {
                const isParticipating = participating?.find(
                  (info) => info.chatId === chat.id
                );
                const participants = allParticipants.filter(
                  (participant) => participant.chatId === chat.id
                );
                const chatId = chat.id;
                const fav = favoriteStatus[chatId] || false;

                return (
                  <div className="flex items-center my-10" key={chat.id}>
                    <div className="w-10 h-10  mr-16">
                      <img
                        src={`./images/chat${i + 1}.png`}
                        alt="profilePic.jpg"
                      />
                    </div>
                    <div className=" w-64">
                      <h3 className=" w-full text-xl">{chat.name}</h3>
                      <p className="w-full">{chat.description}</p>
                    </div>
                    <p>👤 {participants.length}</p>
                    <Link className="mx-4" to={`/chats/${chat.code}`}>
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
    </div>
  );
};

export default Home;
