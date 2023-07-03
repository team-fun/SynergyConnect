import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import { me } from "../auth/authSlice";
import { useParams } from "react-router-dom";

const UserView = () => {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const _user = useSelector((state) => state.auth.me);
  const { id } = useParams();
  const [editUsername, setEditUsername] = useState(false);
  const [editName, setEditName] = useState(false);
  const [editBio, setEditBio] = useState(false);
  const [editLocation, setEditLocation] = useState(false);
  const [editInterests, setEditInterests] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editEmail, setEditEmail] = useState(false);
  const [placeHolder, setPlaceHolder] = useState("");

  async function fetchUser() {
    const data = await (await fetch("/api/users/" + id)).json();
   
    setUser(data);
  }
  useEffect(() => {
	console.log("placeholder", placeHolder)
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
			console.log(i);
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

  return (
    <div className="userViewWrapper">
      <div className="profile">
        <div className="pfp">
          <img src={user.image} alt="" />
        </div>
        <div className="user-info">
          <div className="username">
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
                <button onClick={(e) => setEditUsername(true)}>
                  <EditIcon />
                </button>
              ) : (
                <button onClick={(e) => setEditUsername(false)}>
                  <DoneIcon />
                </button>
              ))}
          </div>
          <div className="fullname">
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
                <button onClick={(e) => setEditName(true)}>
                  <EditIcon />
                </button>
              ) : (
                <button onClick={(e) => setEditName(false)}>
                  <DoneIcon />
                </button>
              ))}
          </div>
          <div className="email">
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
                <button onClick={(e) => setEditEmail(true)}>
                  <EditIcon />
                </button>
              ) : (
                <button onClick={(e) => setEditEmail(false)}>
                  <DoneIcon />
                </button>
              ))}
          </div>
          <div className="bio">
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
                <button onClick={(e) => setEditBio(true)}>
                  <EditIcon />
                </button>
              ) : (
                <button onClick={(e) => setEditBio(false)}>
                  <DoneIcon />
                </button>
              ))}{" "}
          </div>
          <div className="location">
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
                <button onClick={(e) => setEditLocation(true)}>
                  <EditIcon />
                </button>
              ) : (
                <button onClick={(e) => setEditLocation(false)}>
                  <DoneIcon />
                </button>
              ))}{" "}
          </div>
          <div className="user-info-exta">
            <ul className="interests">
              {editInterests ? <p>Edit Interests:</p> : <p>Interests</p>}
              {!editInterests && (
             <>
                  {user.interests?.map((i) => (
                    <span>{i}</span>
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
                  <button onClick={(e) => setEditInterests(true)}>
                    <EditIcon />
                  </button>
                ) : (
                  <button onClick={(e) => setEditInterests(false)}>
                    <DoneIcon />
                  </button>
                ))}
            </ul>
            <div className="link">
              <InstagramIcon></InstagramIcon>
              <FacebookIcon></FacebookIcon>
              <TwitterIcon></TwitterIcon>
              <LinkedInIcon></LinkedInIcon>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserView;
