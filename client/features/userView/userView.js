import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
import axios from "axios";
// import EditIcon from "@mui/icons-material/Edit";
// import DoneIcon from "@mui/icons-material/Done";
import { fetchSingleUser, editUser } from "../admin/editUserSlice";
import { me } from "../auth/authSlice";
import { useParams } from "react-router-dom";
import Friends from "../friends/Friends";
import { fetchAllFriends, selectFriends } from "../home/AllFriendsSlice";
import SearchBox from "../seachbar/SearchBar";
import AiFillGithub from "react-icons/ai";

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
  console.log(friends);
  async function fetchUser() {
    const data = await (await fetch("/api/users/" + id)).json();

    setUser(data);
  }
  useEffect(() => {
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
        arr.forEach((i, index) => {
          if (index !== arr.length - 1) {
            str += i + ", ";
          } else {
            str += i;
          }
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
  useEffect(() => {
    if (user) dispatch(fetchAllFriends({ id: user.id }));
  }, [user]);
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
      <div className="py-10 w-[70%] px-5 flex items-center justify-between">
        <div className="pfp w-40 h-40 object-cover">
          <img
            style={{ height: "unset" }}
            className="w-full"
            src={image ? image : user.image}
            alt="pfp"
          />
          <div className="online-status">
            <div style={{ background: user.online ? "#00cc11" : "#888" }}></div>
          </div>
          <input type="file" onChange={handleImageChange} />
        </div>
        <div className="mx-[auto]">
          <h3 className="text-[30px] my-0 ">Welcome!</h3>
          <p className="font-medium my-0">
            {" "}
            {user.firstName} {user.lastName}
          </p>
        </div>

        <div
          className={`absolute right-4 mt-[4.5rem] ${
            showFriends ? "bg-[#D9D9D9]" : ""
          }`}
        >
          <div>
            <div className="w-72 text-center" onClick={toggleFriendsList}>
              <span className="text-[36px] mr-2">{friends.length}</span> Friends
            </div>
          </div>
          {showFriends && <Friends />}
        </div>
      </div>
      <div
        style={{ background: "#D9D9D9" }}
        className="w-[80%] h-[60%] text-center mt-10 py-2 px-4 rounded-lg"
      >
        <h3 className="ml-10 text-[30px]">USER PROFILE</h3>
        <div className="user-info [&>*]:my-4">
          <div className="flex justify-around">
            <div className="username flex items-center">
              Username: {!editUsername && user.username}
              {editUsername && (
                <>
                  {" "}
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
                  <div className="ml-2" onClick={(e) => setEditUsername(true)}>
                    edit
                  </div>
                ) : (
                  <div className="ml-2" onClick={(e) => setEditUsername(false)}>
                    done
                  </div>
                ))}
            </div>

            <div className="fullname flex items-center">
              {!editName && (
                <>
                  Full Name:{user.firstName} {user.lastName}
                </>
              )}
              {editName && (
                <>
                  {" "}
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
                  <div className="ml-2" onClick={(e) => setEditName(true)}>
                    edit
                  </div>
                ) : (
                  <div className="ml-2" onClick={(e) => setEditName(false)}>
                    done
                  </div>
                ))}
            </div>
          </div>
          <div className="flex justify-around">
            <div className="email flex items-center">
              Email:{" "}
              {!editEmail &&
                user.email &&
                (user.email.split("").includes("@") &&
                user.email.split("").includes(".")
                  ? user.email
                  : _user.email)}
              {!editEmail && !user.email && <span>Add an Email</span>}
              {editEmail && (
                <>
                  {" "}
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
                  <div className="ml-2" onClick={(e) => setEditEmail(true)}>
                    edit
                  </div>
                ) : (
                  <div className="ml-2" onClick={(e) => setEditEmail(false)}>
                    done
                  </div>
                ))}
            </div>
            <div className="location flex items-center">
              Location:{" "}
              {!editLocation && (user.location || (!id && "Add a Location"))}
              {editLocation && (
                <>
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
                  <div className="ml-2" onClick={(e) => setEditLocation(true)}>
                    edit
                  </div>
                ) : (
                  <div className="ml-2" onClick={(e) => setEditLocation(false)}>
                    done
                  </div>
                ))}{" "}
            </div>
          </div>
          <div className="bio flex justify-center items-center">
            Bio: {!editBio && (user.bio || (!id && "Add a Bio"))}
            {editBio && (
              <>
                {" "}
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
                <div className="ml-2" onClick={(e) => setEditBio(true)}>
                  edit
                </div>
              ) : (
                <div className="ml-2" onClick={(e) => setEditBio(false)}>
                  done
                </div>
              ))}{" "}
          </div>

          <div className="user-info-exta">
            <ul className="interests flex flex-col justify-center items-center">
              <div className="flex justify-center items-center">
                {editInterests ? (
                  <p className="text-[20px] my-0">Edit Interests:</p>
                ) : (
                  <p className="text-[20px] my-0">Interests:</p>
                )}
                {!id &&
                  (!editInterests ? (
                    <div
                      className="ml-2"
                      onClick={(e) => setEditInterests(true)}
                    >
                      edit
                    </div>
                  ) : (
                    <div
                      className="ml-2"
                      onClick={(e) => setEditInterests(false)}
                    >
                      done
                    </div>
                  ))}
              </div>
              {!editInterests && (
                <div className="text-left flex flex-col ml-10">
                  <ul className="list-disc">
                    {user.interests?.map((interest, index) => (
                      <li className="text-slate-500" key={index}>
                        {interest}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {editInterests && (
                <input
                  onChange={(e) => {
                    setPlaceHolder(e.target.value);
                  }}
                  value={placeHolder}
                />
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="link w-[95%] lg:w-[70%] text-center mt-3 ">
        {/* <a href="https://www.instagram.com/">
          <InstagramIcon style={{ fontSize: "50px" }} />
        </a>
        <a href="https://www.facebook.com/">
          <FacebookIcon style={{ fontSize: "50px" }} />
        </a>
        <a href="https://twitter.com/i/flow/login?redirect_after_login=%2F">
          <TwitterIcon style={{ fontSize: "50px" }} />
        </a>
        <a href="https://www.linkedin.com/" />
        <LinkedInIcon style={{ fontSize: "50px" }} />
        <a href="https://github.com/team-fun/SynergyConnect">
          <img
            src="https://icons.veryicon.com/png/o/miscellaneous/mirror-icon/github-65.png"
            alt="Github"
          />
        </a> */}
      </div>
    </div>
  );
};

export default UserView;
