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

    // const user = useSelector((state) => {
    //     console.log('this is user in EditUser', state.editUser.editUserObj)
    //     return state.editUser.editUserObj
    // })
    const navigate = useNavigate();
	const { id } = useParams();

	// const [username, setUserName] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");


	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			editUser({
				id,
				// username,
				firstName,
				lastName,
				email,
			})
		);
		dispatch(fetchSingleUser(id));
     	// setUserName("");
		setFirstName("");
     	setLastName("");
     	setEmail("");

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

					{/* <label htmlFor="username">User Name:</label>
					<input
						name="username" 
						value={username}
						placeholder="Enter User Name"
						onChange={(e) => setUserName(e.target.value)}
					/> */}

					<label htmlFor="firstName">First Name:</label>
					<input
						name="firstName" 
						value={firstName}
						placeholder="Enter User's First Name"
						onChange={(e) => setFirstName(e.target.value)}
					/>

					<label htmlFor="lastName">Last Name:</label>
					<input
						name="lastName"
						value={lastName}
						placeholder="Enter User's Last Name"
						onChange={(e) => setLastName(e.target.value)}
					/>

					<label htmlFor="email">Email:</label>
					<input
						name="email"
						value={email}
						placeholder="Enter User's Email Address"
						onChange={(e) => setEmail(e.target.value)}
					/>

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
