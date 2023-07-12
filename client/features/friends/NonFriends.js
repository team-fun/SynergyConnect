import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendFriendRequest } from "../home/AllFriendsSlice";
import {
  fetchAllNonFriends,
  selectNonFriends,
} from "../home/AllNonFriendsSlice";
import SearchBox from "../seachbar/SearchBar";

const NonFriends = () => {
  const id = useSelector((state) => state.auth.me.id);
  const [friendListChange, setfriendListChange] = useState(false);
  const nonFriends = useSelector(selectNonFriends) || [];
  const [filteredNonFriends, setFilteredNonFriends] = useState([]);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllNonFriends({ id }));
  }, [dispatch, friendListChange]);

  useEffect(() => {
    setFilteredNonFriends(
      nonFriends.filter((nonFriend) => {
        const username = nonFriend.username.toLowerCase();
        return username.includes(search.toLowerCase());
      })
    );
  }, [nonFriends, search]);

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
    <div>
      <SearchBox searchChange={onSearchChange} />
      {filteredNonFriends.length === 0 ? (
        <div>All Users are friends</div>
      ) : (
        <div>
          <h2>Users:</h2>
          {filteredNonFriends.map((nonFriend, i) => (
            <div key={i}>
              {nonFriend.username}{" "}
              <button onClick={() => handleSendRequest(nonFriend.id)}>+</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NonFriends;
