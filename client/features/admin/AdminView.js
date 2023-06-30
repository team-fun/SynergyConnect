import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchAllUsers, deleteUser } from "./adminViewSlice";

const AllUsers = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const allUsers = useSelector((state) => {
        return state.allUsers.userList
    })

    useEffect(() => {
        dispatch(fetchAllUsers())
    }, [dispatch])

    const usersDiv =
        allUsers ? (
            <div>
                <div className="mainAdmin-container">
                    <div className="adminUsers-container">
                        <h1>Edit Users</h1>
                        {
                            allUsers.map((user) => {
                                return(
                                    <div className="userContainer" key={user.id}>
                                  
                                        <Link className="individualUser" to={`/profile/${user.id}`}>
                                            <h1 >{`${user.firstName} ${user.lastName}`}</h1>
                                        </Link>
                                        <div className="adminButtonDiv">
                                            <button className="userEditBtn" onClick={()=>{
                                                navigate(`/admin/${user.id}`)
                                            }}>Edit User</button>
                                            <button className="userDeleteBtn" onClick={()=>{
                                                dispatch(deleteUser(user.id))
                                            }}>Delete User</button>
                                        </div>
                                    </div>
                            )
                            })
                        }
                    </div>    
                </div>
            </div>
        ) : (
            <div>No Users</div>
        ); 

    return (
        <div className='adminUser-mainDiv'>
            {usersDiv}
        </div>
    );
}

export default AllUsers