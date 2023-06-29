import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CreateRoomForm from "./CreateRoomForm";
import { fetchGetAllChatRooms, selectChat } from "./createRoomFormSlice";


/**
 * COMPONENT
 */
const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);
  const [createFormVis, setCreateFormVis] = useState(false);
  const dispatch = useDispatch()


  const chats = useSelector((state) => {
    return state.chats
  })
  console.log("THIS IS CHATS", chats);

  useEffect(() => {
    dispatch(fetchGetAllChatRooms())
  }, [dispatch])



  const create = () => {
    setCreateFormVis(true);
  };



  return (
    <div>
      {createFormVis ? (
        <>
          <CreateRoomForm />
          <button onClick={() => setCreateFormVis(false)}>Back</button>
        </>
      ) : (
        <>
          <h3>Welcome, {username}</h3>
          <button onClick={create}>Create Room</button>
        <div>
          {
            chats.map((chat) => {
              return (
                <div>
                  {chat.name}
                </div>
              )
          })
          }

        </div>
        </>
      )}
      




    </div>
  );
};

export default Home;
