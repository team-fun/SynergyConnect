import React, { useEffect ,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { fetchSingleUser, editUser } from "../admin/editUserSlice";


import {useParams} from "react-router-dom"
import axios from "axios";

const UserView = () => {
	const [image, setImage] = useState();
	const [user, setUser] = useState({})
	const _user = useSelector((state) => state.auth.me);
	const{ id} = useParams() 
	const dispatch = useDispatch();

 async function fetchUser(){
          setUser( await( await fetch("/api/users/"+id)).json())
            
  }
  async function setToMe(){
 setUser(_user)
  }
  useEffect(()=>{
if(id){
    fetchUser()
}else{
    setToMe()
}
   
          
            
            
   },[])
const handleImageChange = async (e) => {
	const inputValue = e.target.files[0];
	let formData = new FormData();

	formData.append("image", inputValue);
	await axios.post("/api/upload", formData).then(async (res) => {
		setImage(res?.data?.url);
		await dispatch(
			editUser({
				id: user?.id,
				image: res?.data?.url,
			})
		);
	});
};
return (
	<div className="userViewWrapper">
		<div className="profile">
			<div className="pfp">
				<img src={image? image :user.image} alt="" />
			</div>
			<input type="file" onChange={handleImageChange} />
			<div className="user-info">
				<div className="username">{user.username}</div>
				<div className="fullname">
					{user.firstName} {user.lastName}
				</div>
				<div className="email">{user.email}</div>
				<div className="bio">{user.bio}</div>
				<div className="location">{user.location}</div>
				<div className="user-info-exta">
					<ul className="interests">
						{user.interests?.map((i) => (
							<li key={i}>{i}</li>
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
);}


export default UserView;