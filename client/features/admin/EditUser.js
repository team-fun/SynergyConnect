import React, { useState, useEffect } from "react";
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

	useEffect(() => {
		dispatch(fetchSingleUser(id));
	}, [dispatch]);

    const editUser = useSelector((state) => {
        return state.editUser.editUserObj
    })

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
		<div className="editUser-shell">
			<div className="editUser-mainWrapper">
				<li key={id}>
					<h2> Edit User Info Below</h2>
				</li>

				<form className="editUserForm-wrapper" onSubmit={handleSubmit}>

					<label htmlFor="username">User Name:</label>
					<input
						name="username" 
						value={username}
						placeholder={`${editUser.firstName}`}
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
						placeholder={`${editUser.firstName}`}
						onChange={(e) => setFirstName(e.target.value)}
					/>

					<label htmlFor="lastName">Last Name:</label>
					<input
						name="lastName"
						value={lastName}
						placeholder={`${editUser.lastName}`}
						onChange={(e) => setLastName(e.target.value)}
					/>

					<label htmlFor="email">Email:</label>
					<input
						name="email"
						value={email}
						placeholder={`${editUser.email}`}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<label htmlFor="bio">Bio:</label>
					<input
						name="bio"
						value={bio}
						placeholder={`${editUser.bio}`}
						onChange={(e) => setBio(e.target.value)}
					/>

					<label htmlFor="icon">Icon:</label>
					<input
						name="icon"
						value={icon}
						placeholder={`${editUser.icon}`}
						onChange={(e) => setIcon(e.target.value)}
					/>

					<br />
					<div className="button-box">
						<button className="submitBtn" type="submit">Submit Changes</button>

						<Link to="/admin" className="cancelLink">
							<button className="cancelBtn">Cancel</button>
						</Link>

						<button className="deleteBtn" onClick={handleDelete}>Delete</button>
					</div>
				</form>
			</div>
		</div>	
	);
};

export default EditUser;
