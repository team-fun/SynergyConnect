import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";
import { selectUser } from "../auth/authSlice";
import { useState } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { AiFillHome } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { MdContactMail, MdOutlineAdminPanelSettings } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { FiLogIn } from "react-icons/fi";
import { ImProfile } from "react-icons/im";
import { FaUserFriends } from "react-icons/fa";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };
  const user = useSelector(selectUser);
  const isAdmin = user.me.isAdmin;
  const [theme, setTheme] = useState(true);
  const [hoverIcon, setHoverIcon] = useState(null);
  const { pathname } = useLocation();
  function changeTheme() {
    !theme
      ? document
          .querySelectorAll("*")
          .forEach((e) => e.classList.remove("dark"))
      : document.querySelectorAll("*").forEach((e) => e.classList.add("dark"));
  }

  const handleIconMouseHover = (iconName) => {
    setHoverIcon(iconName);
  };

  const handleIconMouseLeave = (iconName) => {
    setHoverIcon(null);
  };

  return (
    <div>
      <div className="h-screen flex flex-col justify-center items-center w-40 [&>*]:text-lg">
        <div className="flex flex-col justify-center items-center w-20 navbarArea  text-white rounded-3xl my-6 mx-10 h-full">
          <h1 className="mainName">sC</h1>
          <nav>
            {isLoggedIn ? (
              isAdmin ? (
                <div className="flex flex-col [&>*]:my-4">
                  {/* The navbar will show these links after you log in */}
                  <Link
                    className={` ${
                      pathname == "/" || pathname == "/home"
                        ? "activeNav"
                        : "nonActiveNav"
                    }`}
                    to="/home"
                    onMouseEnter={() => handleIconMouseHover("Home")}
                    onMouseLeave={handleIconMouseLeave}
                  >
                    <AiFillHome
                      className={hoverIcon === "Home"}
                      style={{
                        transition: "transform 1s",
                        transform:
                          hoverIcon === "Home" ? "scale(1.5)" : "scale(1)",
                          transition: "transform 1s"
                      }}
                    />
                    {hoverIcon === "Home" && (
                      <span
                        className="hoverName"
                      >
                        Home
                      </span>
                    )}
                  </Link>
                  <Link
                    className={` ${
                      pathname == "/friends" ? "activeNav" : "nonActiveNav"
                    }`}
                    to="/friends"
                    onMouseEnter={() => handleIconMouseHover("Friends")}
                    onMouseLeave={handleIconMouseLeave}
                  >
                    <FaUserFriends
                      className={hoverIcon === "Friends"}
                      style={{
                        transform:
                          hoverIcon === "Friends" ? "scale(1.5)" : "scale(1)",
                          transition: "transform 1s"
                      }}
                    />
                    {hoverIcon === "Friends" && (
                      <span className="hoverName">Friends</span>
                    )}
                  </Link>
                  <Link
                    className={` ${
                      pathname == "/ContactUs" ? "activeNav" : "nonActiveNav"
                    }`}
                    to="/ContactUs"
                    style={{
                      transform:
                        hoverIcon === "Contact Us" ? "scale(1.5)" : "scale(1)",
                        transition: "transform 1s"
                    }}
                    onMouseEnter={() => handleIconMouseHover("Contact Us")}
                    onMouseLeave={handleIconMouseLeave}
                  >
                    <MdContactMail />
                  </Link>
                  <Link
                    className={` ${
                      pathname == "/profile" ? "activeNav" : "nonActiveNav"
                    }`}
                    to="/profile"
                    style={{
                      transform:
                        hoverIcon === "Profile" ? "scale(1.5)" : "scale(1)",
                        transition: "transform 1s"
                    }}
                    onMouseEnter={() => handleIconMouseHover("Profile")}
                    onMouseLeave={handleIconMouseLeave}
                  >
                    <FaUserAlt />
                  </Link>
                  <Link
                    className={` ${
                      pathname == "/admin" ? "activeNav" : "nonActiveNav"
                    }`}
                    to="/admin"
                    style={{
                      transform:
                        hoverIcon === "Admin" ? "scale(1.5)" : "scale(1)",
                        transition: "transform 1s"
                    }}
                    onMouseEnter={() => handleIconMouseHover("Admin")}
                    onMouseLeave={handleIconMouseLeave}
                  >
                    <MdOutlineAdminPanelSettings />
                  </Link>
                  <Link
                    className={` ${
                      pathname == "/Calendar" ? "activeNav" : "nonActiveNav"
                    }`}
                    to="/Calendar"
                    style={{
                      transform:
                        hoverIcon === "Calendar" ? "scale(1.5)" : "scale(1)",
                      transition: "transform 1s"
                    }}
                    onMouseEnter={() => handleIconMouseHover("Calendar")}
                    onMouseLeave={handleIconMouseLeave}
                  >
                    <SlCalender />
                  </Link>
                  <button type="button" onClick={logoutAndRedirectHome}>
                    <BiLogOut />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col [&>*]:my-4 ">
                  {/* The navbar will show these links after you log in */}
                  <Link
                    className={` ${
                      pathname == "/" || pathname == "/home"
                        ? "activeNav"
                        : "nonActiveNav"
                    }`}
                    to="/home"
                    style={{
                      transform:
                        hoverIcon === "Home" ? "scale(1.5)" : "scale(1)",
                        transition: "transform 1s"
                    }}
                    onMouseEnter={() => handleIconMouseHover("Home")}
                    onMouseLeave={handleIconMouseLeave}
                  >
                    <AiFillHome />
                  </Link>
                  <Link
                    className={` ${
                      pathname == "/profile" ? "activeNav" : "nonActiveNav"
                    }`}
                    to="/profile/1"
                    style={{
                      transform:
                        hoverIcon === "Profile" ? "scale(1.5)" : "scale(1)",
                        transition: "transform 1s"
                    }}
                    onMouseEnter={() => handleIconMouseHover("Profile")}
                    onMouseLeave={handleIconMouseLeave}
                  >
                    <FaUserAlt />
                  </Link>
                  <Link
                    className={` ${
                      pathname == "/Calendar" ? "activeNav" : "nonActiveNav"
                    }`}
                    to="/Calendar"
                    style={{
                      transform:
                        hoverIcon === "Calendar" ? "scale(1.5)" : "scale(1)",
                        transition: "transform 1s"
                    }}
                    onMouseEnter={() => handleIconMouseHover("Calendar")}
                    onMouseLeave={handleIconMouseLeave}
                  >
                    <SlCalender />
                  </Link>
                  <Link
                    className={` ${
                      pathname == "/friends" ? "activeNav" : "nonActiveNav"
                    }`}
                    to="/friends"
                    style={{
                      transform:
                        hoverIcon === "Friends" ? "scale(1.5)" : "scale(1)",
                        transition: "transform 1s"
                    }}
                    onMouseEnter={() => handleIconMouseHover("Friends")}
                    onMouseLeave={handleIconMouseLeave}
                  >
                    Fr!
                  </Link>
                  <Link
                    className={` ${
                      pathname == "/ContactUs" ? "activeNav" : "nonActiveNav"
                    }`}
                    to="/ContactUs"
                    style={{
                      transform:
                        hoverIcon === "Contact" ? "scale(1.5)" : "scale(1)",
                        transition: "transform 1s"
                    }}
                    onMouseEnter={() => handleIconMouseHover("Contact")}
                    onMouseLeave={handleIconMouseLeave}
                  >
                    C
                  </Link>
                  <button type="button" onClick={logoutAndRedirectHome}>
                    Logout
                  </button>
                </div>
              )
            ) : (
              <div className="flex flex-col [&>*]:my-4">
                {/* The navbar will show these links before you log in */}
                <Link
                  className={` ${
                    pathname == "/login" ? "activeNav" : "nonActiveNav"
                  }`}
                  to="/login"
                  style={{
                    transform:
                      hoverIcon === "Login" ? "scale(1.5)" : "scale(1)",
                      transition: "transform 1s"
                  }}
                  onMouseEnter={() => handleIconMouseHover("Login")}
                  onMouseLeave={handleIconMouseLeave}
                >
                  <FiLogIn />
                </Link>
                <Link
                  className={` ${
                    pathname == "/signup" ? "activeNav" : "nonActiveNav"
                  }`}
                  to="/signup"
                  style={{
                    transform:
                      hoverIcon === "Sign Up" ? "scale(1.5)" : "scale(1)",
                      transition: "transform 1s"
                  }}
                  onMouseEnter={() => handleIconMouseHover("Sign Up")}
                  onMouseLeave={handleIconMouseLeave}
                >
                  <ImProfile />
                </Link>
                <Link
                  className={` ${
                    pathname == "/ContactUs" ? "activeNav" : "nonActiveNav"
                  }`}
                  to="/ContactUs"
                  style={{
                    transform:
                      hoverIcon === "Contact" ? "scale(1.5)" : "scale(1)",
                      transition: "transform 1s"
                  }}
                  onMouseEnter={() => handleIconMouseHover("Contact")}
                  onMouseLeave={handleIconMouseLeave}
                >
                  C
                </Link>
              </div>
            )}
            <div
              className={"theme-btn" + (!theme ? " dark" : "")}
              onClick={(e) => {
                setTheme(!theme);
                changeTheme();
              }}
            >
              <div className="inner">
                {theme ? <LightModeIcon /> : <DarkModeIcon />}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
