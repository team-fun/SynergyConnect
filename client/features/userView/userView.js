import React, { useEffect ,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {useParams} from "react-router-dom"

const UserView = () => {
const [user, setUser] = useState({})
const _user = useSelector((state) => state.auth.me);
  const{ id} = useParams() 

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

return (
	<div className="userViewWrapper">
		<div className="profile">
			<div className="pfp">
			<img src={user.image} alt="" />
			</div>
			<div className="user-info">
				<div className="username">{user.username}</div>
				<div className="fullname">{user.firstName} {user.lastName}</div>
                <div className="email">
                    {user.email}
                </div>
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