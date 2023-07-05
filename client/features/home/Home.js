import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CreateRoomForm from "./CreateRoomForm";
import { selectChats, fetchAllChats } from "./AllChatsSlice";
import {
  sendFriendRequest,
  selectFriends,
  fetchAllFriends,
  acceptRejectRequest,
} from "./AllFriendsSlice";
import { fetchAllNonFriends, selectNonFriends } from "./AllNonFriendsSlice";

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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllChats());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchAllFriends({ id }));
    dispatch(fetchAllNonFriends({ id }));
  }, [dispatch, friendListChange]);
  const handleFriendListChange = () => {
    setfriendListChange(!friendListChange);
  };
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
  console.log(friends);
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
