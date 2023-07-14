import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";
import { selectUser } from "../auth/authSlice";
import { useState } from "react";
// import LightModeIcon from "@mui/icons-material/LightMode";
// import DarkModeIcon from "@mui/icons-material/DarkMode";
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
  const { pathname } = useLocation();
  function changeTheme() {
    !theme
      ? document
          .querySelectorAll("*")
          .forEach((e) => e.classList.remove("dark"))
      : document.querySelectorAll("*").forEach((e) => e.classList.add("dark"));
  }
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
                  >
                    <AiFillHome />
                  </Link>
                  <Link
                    className={` ${
                      pathname == "/friends" ? "activeNav" : "nonActiveNav"
                    }`}
                    to="/friends"
                  >
                    <FaUserFriends />
                  </Link>
                  <Link
                    className={` ${
                      pathname == "/ContactUs" ? "activeNav" : "nonActiveNav"
                    }`}
                    to="/ContactUs"
                  >
                    <MdContactMail />
                  </Link>
                  <Link
                    className={` ${
                      pathname == "/profile" ? "activeNav" : "nonActiveNav"
                    }`}
                    to="/profile"
                  >
                    <FaUserAlt />
                  </Link>
                  <Link
                    className={` ${
                      pathname == "/admin" ? "activeNav" : "nonActiveNav"
                    }`}
                    to="/admin"
                  >
                    <MdOutlineAdminPanelSettings />
                  </Link>
                  <Link
                    className={` ${
                      pathname == "/Calendar" ? "activeNav" : "nonActiveNav"
                    }`}
                    to="/Calendar"
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
                  >
                    <AiFillHome />
                  </Link>
                  <Link
                    className={` ${
                      pathname == "/profile" ? "activeNav" : "nonActiveNav"
                    }`}
                    to="/profile/1"
                  >
                    <FaUserAlt />
                  </Link>
                  <Link
                    className={` ${
                      pathname == "/Calendar" ? "activeNav" : "nonActiveNav"
                    }`}
                    to="/Calendar"
                  >
                    <SlCalender />
                  </Link>
                  <Link
                    className={` ${
                      pathname == "/friends" ? "activeNav" : "nonActiveNav"
                    }`}
                    to="/friends"
                  >
                    Fr!
                  </Link>
                  <Link
                    className={` ${
                      pathname == "/ContactUs" ? "activeNav" : "nonActiveNav"
                    }`}
                    to="/ContactUs"
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
                >
                  <FiLogIn />
                </Link>
                <Link
                  className={` ${
                    pathname == "/signup" ? "activeNav" : "nonActiveNav"
                  }`}
                  to="/signup"
                >
                  <ImProfile />
                </Link>
                <Link
                  className={` ${
                    pathname == "/ContactUs" ? "activeNav" : "nonActiveNav"
                  }`}
                  to="/ContactUs"
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
                {/* {theme ? <LightModeIcon /> : <DarkModeIcon />} */}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
