import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import axios from "axios";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import { fetchSingleUser, editUser } from "../admin/editUserSlice";
import { me } from "../auth/authSlice";
import { useParams } from "react-router-dom";
import Friends from "../friends/Friends";
import { selectFriends } from "../home/AllFriendsSlice";
import SearchBox from "../seachbar/SearchBar";

const UserView = () => {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const _user = useSelector((state) => state.auth.me);
  const friends = useSelector(selectFriends) || [];
  const { id } = useParams();
  const [editUsername, setEditUsername] = useState(false);
  const [editName, setEditName] = useState(false);
  const [editBio, setEditBio] = useState(false);
  const [editLocation, setEditLocation] = useState(false);
  const [editInterests, setEditInterests] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editEmail, setEditEmail] = useState(false);
  const [placeHolder, setPlaceHolder] = useState("");
  const [image, setImage] = useState();
  const [showFriends, setShowFriends] = useState(false);
  const [search, setSearch] = useState("");

  async function fetchUser() {
    const data = await (await fetch("/api/users/" + id)).json();

    setUser(data);
  }
  useEffect(() => {
    console.log("placeholder", placeHolder);
    if (user) {
      setUser((state) => {
        const arr = [];
        placeHolder.split(",").forEach((i) => {
          arr.push(i.trim());
        });
        return { ...state, interests: arr };
      });
    }
  }, [placeHolder]);
  async function setToMe() {
    setUser(_user);
    setPlaceHolder(
      ((arr) => {
        let str = "";
        arr.forEach((i) => {
          str += i + ", ";
        });

        return str;
      })(_user.interests)
    );
  }
  useEffect(() => {
    if (id) {
      fetchUser();
    } else {
      setToMe();
    }
  }, []);
  const onSearchChange = (event) => {
    setSearch(event.target.value);
  };
  const toggleFriendsList = () => {
    setShowFriends(!showFriends);
  };
  async function updateUser() {
    if (
      !user.email.split("").includes("@") ||
      !user.email.split("").includes(".")
    )
      return;

    await fetch("/api/users/" + user.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    dispatch(me());
  }

  useEffect(() => {
    if (user.id && !isLoading) {
      let timeout = setTimeout(updateUser, 1000);
      return () => clearTimeout(timeout);
    } else {
      if (user.id) setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (id) {
      fetchUser();
    } else {
      setToMe();
    }
  }, []);

  const handleImageChange = async (e) => {
    const inputValue = e.target.files[0];
    let formData = new FormData();

    formData.append("image", inputValue);
    await axios.post("/api/upload", formData).then(async (res) => {
      setImage(res?.data?.url);
      await dispatch(
        editUser({
          id: user?.id,
          image: res?.data?.url,
        })
      );
    });
  };

  return (
    <div className="profile">
      <div className="py-10 w-full px-5 flex items-center justify-between">
        <div className="pfp w-20 h-20 object-cover">
          <img className="w-full" src={image ? image : user.image} alt="pfp" />
          <input type="file" onChange={handleImageChange} />
        </div>
        <div>
          <h3 className="text-3xl">
            {" "}
            {user.firstName} {user.lastName}
          </h3>
          <p className="font-medium"> Its good to see you</p>
        </div>

        <div className="flex justify-center items-center">
          <div>
            <SearchBox searchChange={onSearchChange} />

            <button
              onClick={toggleFriendsList}
            >{`${friends.length} Friends`}</button>
          </div>
          {showFriends && <Friends />}
        </div>
      </div>
      <div className="mt-20">
        <h3 className="ml-10 text-5xl">USER PROFILE</h3>
        <div className="user-info [&>*]:my-4">
          <div className="username flex items-center">
            {!editUsername && user.username}
            {editUsername && (
              <>
                Edit username:{" "}
                <input
                  value={user.username}
                  onChange={(e) =>
                    setUser((state) => {
                      return { ...state, username: e.target.value };
                    })
                  }
                />
              </>
            )}
            {!id &&
              (!editUsername ? (
                <div onClick={(e) => setEditUsername(true)}>
                  <EditIcon />
                </div>
              ) : (
                <div onClick={(e) => setEditUsername(false)}>
                  <DoneIcon />
                </div>
              ))}
          </div>
          <div className="fullname flex items-center">
            {!editName && (
              <>
                {user.firstName} {user.lastName}
              </>
            )}
            {editName && (
              <>
                Edit Name:{" "}
                <input
                  value={user.firstName}
                  onChange={(e) =>
                    setUser((state) => {
                      return { ...state, firstName: e.target.value };
                    })
                  }
                />
                <input
                  value={user.lastName}
                  onChange={(e) =>
                    setUser((state) => {
                      return { ...state, lastName: e.target.value };
                    })
                  }
                />
              </>
            )}
            {!id &&
              (!editName ? (
                <div onClick={(e) => setEditName(true)}>
                  <EditIcon />
                </div>
              ) : (
                <div onClick={(e) => setEditName(false)}>
                  <DoneIcon />
                </div>
              ))}
          </div>
          <div className="email flex items-center">
            {!editEmail &&
              user.email &&
              (user.email.split("").includes("@") &&
              user.email.split("").includes(".")
                ? user.email
                : _user.email)}
            {!editEmail && !user.email && <span>Add an Email</span>}
            {editEmail && (
              <>
                Edit Email:{" "}
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) =>
                    setUser((state) => {
                      return { ...state, email: e.target.value };
                    })
                  }
                />
              </>
            )}
            {!id &&
              (!editEmail ? (
                <div onClick={(e) => setEditEmail(true)}>
                  <EditIcon />
                </div>
              ) : (
                <div onClick={(e) => setEditEmail(false)}>
                  <DoneIcon />
                </div>
              ))}
          </div>
          <div className="bio flex items-center">
            {" "}
            {!editBio && (user.bio || (!id && "Add a Bio"))}
            {editBio && (
              <>
                Edit Bio:{" "}
                <input
                  value={user.bio}
                  onChange={(e) =>
                    setUser((state) => {
                      return { ...state, bio: e.target.value };
                    })
                  }
                />
              </>
            )}
            {!id &&
              (!editBio ? (
                <div onClick={(e) => setEditBio(true)}>
                  <EditIcon />
                </div>
              ) : (
                <div onClick={(e) => setEditBio(false)}>
                  <DoneIcon />
                </div>
              ))}{" "}
          </div>
          <div className="location flex items-center">
            {!editLocation && (user.location || (!id && "Add a Location"))}
            {editLocation && (
              <>
                Edit Location:
                <input
                  value={user.location}
                  onChange={(e) =>
                    setUser((state) => {
                      return { ...state, location: e.target.value };
                    })
                  }
                />
              </>
            )}
            {!id &&
              (!editLocation ? (
                <div onClick={(e) => setEditLocation(true)}>
                  <EditIcon />
                </div>
              ) : (
                <div onClick={(e) => setEditLocation(false)}>
                  <DoneIcon />
                </div>
              ))}{" "}
          </div>
          <div className="user-info-exta">
            <ul className="interests flex items-center">
              {editInterests ? <p>Edit Interests:</p> : <p>Interests</p>}
              {!editInterests && (
                <>
                  {user.interests?.map((interest, index) => (
                    <span key={index}>{interest}</span>
                  ))}
                </>
              )}
              {editInterests && (
                <input
                  onChange={(e) => {
                    setPlaceHolder(e.target.value);
                  }}
                  value={placeHolder}
                />
              )}
              {!id &&
                (!editInterests ? (
                  <div onClick={(e) => setEditInterests(true)}>
                    <EditIcon />
                  </div>
                ) : (
                  <div onClick={(e) => setEditInterests(false)}>
                    <DoneIcon />
                  </div>
                ))}
            </ul>
            <div className="link">
              <InstagramIcon style={{ fontSize: "100px" }} />
              <FacebookIcon style={{ fontSize: "100px" }} />
              <TwitterIcon style={{ fontSize: "100px" }} />
              <LinkedInIcon style={{ fontSize: "100px" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserView;
