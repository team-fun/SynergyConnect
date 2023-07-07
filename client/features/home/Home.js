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
  const dispatch = useDispatch();

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

  return (
  <div className="w-full my-6 flex justify-center">
    <section className="flex-1 border-2 border-black p-4">
      <div className="">
        {createFormVis ? (
          <>
            <CreateRoomForm />
            <button onClick={() => setCreateFormVis(false)}>Back</button>
          </>
        ) : (
          <div>
            <div className="py-10 px-5 flex items-center justify-center">
              <div>
                <h3 className="text-3xl">Welcome, {username}</h3>
                <p className="font-thin">It's good to see you</p>
              </div>
              <div>
                <button>Select a theme</button>
              </div>
            </div>
            <div className="py-10 px-5 flex items-center justify-center">
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
          </div>
        )}
      </div>
    </section>
    <div className="flex flex-col items-center">
      <div className="">
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
                            'reject'
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
                              'accept'
                            )
                          }
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            handleAcceptRejectRequest(
                              friend?.dataValues?.id,
                              'reject'
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
                          'reject'
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
                {nonFriend.username}{' '}
                <button onClick={() => handleSendRequest(nonFriend.id)}>
                  +
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);
            }

export default Home;
