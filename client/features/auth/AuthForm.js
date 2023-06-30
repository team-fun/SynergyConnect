import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../../app/store";

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
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
		<div>
			<form
				onSubmit={(evt) => handleSubmit(evt)}
				name={name}
				className="authForm"
			>
				<div>
					<label htmlFor="username">
						<small>Username</small>
					</label>
					<input name="username" type="text" />
				</div>
				<div>
					<label htmlFor="password">
						<small>Password</small>
					</label>
					<input name="password" type="password" />
				</div>
				{displayName === "Sign Up" ? (
					<>
						<div>
							<label htmlFor="firstName">
								<small>First Name</small>
							</label>
							<input name="firstName" type="text" />
						</div>
						<div>
							<label htmlFor="lastName">
								<small>Last Name</small>
							</label>
							<input name="lastName" type="text" />
						</div>
						<div>
							<label htmlFor="email">
								<small>Email</small>
							</label>
							<input name="email" type="email" />
						</div>
					</>
				) : null}
				<div>
					<button type="submit">{displayName}</button>
				</div>
				{error && <div>{error}</div>}
			</form>
		</div>
	);
};

export default AuthForm;
