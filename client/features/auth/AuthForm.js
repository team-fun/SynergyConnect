import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../../app/store";

const AuthForm = ({ name, displayName }) => {
  console.log(name);
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    const email = formName === "signup" ? evt.target.email.value : undefined;
    const firstName =
      formName === "signup" ? evt.target.firstName.value : undefined;
    const lastName =
      formName === "signup" ? evt.target.lastName.value : undefined;

    dispatch(
      authenticate({
        username,
        password,
        email,
        firstName,
        lastName,
        method: formName,
      })
    );
  };

  return (
    <div className="authForm-container">
      <div className="slanted-background"></div>
      <form
        onSubmit={handleSubmit}
        name={name}
        className={`authForm${displayName === "Sign Up" ? " signup" : ""}`}
      >
        {displayName !== "Sign Up" && (
          <div className="authForm-description">
            <p>
              <h1 className="synergyConnect-title my-0">Synergy Connect</h1>
              Introducing Synergy Connect: the all-in-one collaborative
              platform for seamless communication and productivity. Chat,
              video calls, audio calls, calendar integration, and a
              dynamic whiteboard revolutionize how you connect and
              collaborate. Unlock your team's potential with Synergy
              Connect's effortless synergy. Join the revolution today!
            </p>
          </div>
        )}
        <div
          className={`${
            displayName === "Sign Up"
              ? "authForm-input-wrapper-signup"
              : "authForm-input-wrapper"
          }`}
        >
          <h2>
            {displayName === "Sign Up"
              ? "Create an Account:"
              : "Sign In:"}
          </h2>
          <div className="authForm-input">
            <label htmlFor="username">
              <small>Username</small>
            </label>
            <input name="username" type="text" />
          </div>
          <div className="authForm-input">
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          {displayName === "Sign Up" && (
            <>
              <div className="authForm-input">
                <label htmlFor="firstName">
                  <small>First Name</small>
                </label>
                <input name="firstName" type="text" />
              </div>
              <div className="authForm-input">
                <label htmlFor="lastName">
                  <small>Last Name</small>
                </label>
                <input name="lastName" type="text" />
              </div>
              <div className="authForm-input">
                <label htmlFor="email">
                  <small>Email</small>
                </label>
                <input name="email" type="email" />
              </div>
            </>
          )}
          <div>
            <button type="submit">{displayName}</button>
          </div>
        </div>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default AuthForm;
