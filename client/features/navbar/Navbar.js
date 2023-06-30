import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";
import { selectUser } from "../auth/authSlice";

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
      <h1>Synergy Connect</h1>
      <nav>
        {isLoggedIn ? (
          isAdmin ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <Link to="/profile">Profile</Link>
              <Link to="/admin">Admin</Link>
              <button type="button" onClick={logoutAndRedirectHome}>
                Logout
              </button>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <Link to="/profile">Profile</Link>
              <button type="button" onClick={logoutAndRedirectHome}>
                Logout
              </button>
            </div>
          )
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <div>
              <h1>Synergy Connect</h1>
              <p>
                Introducing Synergy Connect: the all-in-one collaborative
                platform for seamless communication and productivity. Chat,
                video calls, audio calls, calendar integration, and a dynamic
                whiteboard revolutionize how you connect and collaborate. Unlock
                your team's potential with Synergy Connect's effortless synergy.
                Join the revolution today!
              </p>
            </div>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
