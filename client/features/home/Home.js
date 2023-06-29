import React, { useState } from "react";
import { useSelector } from "react-redux";
import CreateRoomForm from "./CreateRoomForm";

/**
 * COMPONENT
 */
const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);
  const [createFormVis, setCreateFormVis] = useState(false);

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
        </>
      )}
    </div>
  );
};

export default Home;
