import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  acceptRejectRequest,
  fetchAllFriends,
  selectFriends,
  sendFriendRequest,
} from "../home/AllFriendsSlice";
import {
  fetchAllNonFriends,
  selectNonFriends,
} from "../home/AllNonFriendsSlice";
import SearchBox from "../seachbar/SearchBar";

const Friends = () => {
  const id = useSelector((state) => state.auth.me.id);
  const [friendListChange, setfriendListChange] = useState(false);
  const nonFriends = useSelector(selectNonFriends) || [];
  const [filteredNonFriends, setFilteredNonFriends] = useState([]);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const friends = useSelector(selectFriends) || [];

  useEffect(() => {
    dispatch(fetchAllNonFriends({ id }));
    dispatch(fetchAllFriends({ id }));
  }, [dispatch, friendListChange]);

  useEffect(() => {
    setFilteredNonFriends(
      nonFriends.filter((nonFriend) => {
        const username = nonFriend.username.toLowerCase();
        return username.includes(search.toLowerCase());
      })
    );
  }, [nonFriends, search]);

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
  const handleFriendListChange = () => {
    setfriendListChange(!friendListChange);
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

  const onSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="relative">
      <div
        style={{ background: "#D9D9D9" }}
        className="absolute flex items-center justify-center rounded-md w-72 p-4 top-[20%] "
      >
        {friends.length === undefined || friends?.length === 0 ? (
          <div>No friends</div>
        ) : (
          <div>
            {friends.map((friend, i) => (
              <div className="my-2 mx-3 " key={i}>
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
    </div>
  );
};

export default Friends;
