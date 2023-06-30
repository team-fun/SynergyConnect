import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { deleteUser } from "./adminViewSlice";
import {
	fetchSingleUser,
	editUser,
} from "./editUserSlice";

const EditUser = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

    const allUsers = useSelector((state) => {
        return state.allUsers.userList
    })

	const singleUser = allUsers.filter((user) => {
		return user.id == id;
	});

	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [bio, setBio] = useState("");
	const [icon, setIcon] = useState("");


	const handleSubmit = async (e) => {
		e.preventDefault();
		await dispatch(
			editUser({
				id,
				username,
				password,
				firstName,
				lastName,
				email,
				bio,
				icon,
			})
		);
		dispatch(fetchSingleUser(id));
     	setUserName("");
     	setPassword("");
		setFirstName("");
     	setLastName("");
     	setEmail("");
     	setBio("");
     	setIcon("");

		 navigate("/admin")

	};
	
	const handleDelete = () => {
		dispatch(deleteUser(id));
		navigate("/admin");
	};

	return (
		<div className="login-shell">
			<div className="login-mainWrapper">
				<li key={id}>
					<h2> Edit User Info Below</h2>
				</li>

				<form className="loginForm-wrapper" onSubmit={handleSubmit}>

					<label htmlFor="username">User Name:</label>
					<input
						name="username" 
						value={username}
						placeholder={`${singleUser[0].username}`}
						onChange={(e) => setUserName(e.target.value)}
					/>

					<label htmlFor="password">Password:</label>
					<input
						name="password" 
						value={password}
						placeholder="Enter your new password"
						onChange={(e) => setPassword(e.target.value)}
					/>

					<label htmlFor="firstName">First Name:</label>
					<input
						name="firstName" 
						value={firstName}
						placeholder={`${singleUser[0].firstName}`}
						onChange={(e) => setFirstName(e.target.value)}
					/>

					<label htmlFor="lastName">Last Name:</label>
					<input
						name="lastName"
						value={lastName}
						placeholder={`${singleUser[0].lastName}`}
						onChange={(e) => setLastName(e.target.value)}
					/>

					<label htmlFor="email">Email:</label>
					<input
						name="email"
						value={email}
						placeholder={`${singleUser[0].email}`}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<label htmlFor="bio">Bio:</label>
					<input
						name="bio"
						value={bio}
						placeholder={`${singleUser[0].bio}`}
						onChange={(e) => setBio(e.target.value)}
					/>

					<label htmlFor="icon">Icon:</label>
					<input
						name="icon"
						value={icon}
						placeholder={`${singleUser[0].icon}`}
						onChange={(e) => setIcon(e.target.value)}
					/>

					<br />
					<div className="button-box">
						<button className="submitBtn" type="submit">Submit Changes</button>

						<Link to="/admin">
							<button className="cancelBtn">Cancel</button>
						</Link>

						<div>
							<button className="deleteBtn" onClick={handleDelete}>Delete</button>
						</div>
						
					</div>
				</form>
			</div>
		</div>	
	);
};

export default EditUser;
