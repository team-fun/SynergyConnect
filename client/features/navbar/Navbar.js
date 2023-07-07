import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";
import { selectUser } from "../auth/authSlice";
import { AiFillHome } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import {BiLogOut} from "react-icons/bi"
import {FiLogIn} from "react-icons/fi"
import {ImProfile} from "react-icons/im"

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

  return (
    <div>
      <div className="h-screen flex flex-col justify-center items-center w-40 [&>*]:text-lg">
        <div className="flex flex-col justify-center items-center w-20 bg-black shadow-lg  text-white rounded-3xl my-6 mx-10 h-full">
          <h1>sC</h1>
          <nav>
            {isLoggedIn ? (
              isAdmin ? (
                <div className="flex flex-col [&>*]:my-4">
                  {/* The navbar will show these links after you log in */}
                  <Link className = "custon-icon" to="/home">
                    <AiFillHome />
                  </Link>
                  <Link to="/ContactUs">C</Link>
                  <Link to="/profile">
                    <FaUserAlt />
                  </Link>
                  <Link to="/admin">
                    <MdOutlineAdminPanelSettings />
                  </Link>
                  <button type="button" onClick={logoutAndRedirectHome}>
                    <BiLogOut />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col [&>*]:my-4 ">
                  {/* The navbar will show these links after you log in */}
                  <Link to="/home">
                    <AiFillHome />
                  </Link>
                  <Link to="/profile">
                    <FaUserAlt />
                  </Link>
                  <Link to="/ContactUs">C</Link>
                  <button type="button" onClick={logoutAndRedirectHome}>
                    Logout
                  </button>
                </div>
              )
            ) : (
              <div className="flex flex-col [&>*]:my-4">
                {/* The navbar will show these links before you log in */}
                <Link to="/login">
                  <FiLogIn />
                </Link>
                <Link to="/signup">
                  <ImProfile />
                </Link>
                <Link to="/ContactUs">C</Link>
                <div></div>
              </div>
            )}
          </nav>
        </div>
      </div>

      <hr />
    </div>
  );
};

export default Navbar;
