import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const CreateRoomForm = () => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("Room Name:", roomName);
    console.log("Description:", description);
    console.log("Code:", code);
    console.log("Is Public:", isPublic);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="roomName">
            <small>Chat Name</small>
          </label>
          <input
            name="roomName"
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">
            <small>Description</small>
          </label>
          <input
            name="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="code">
            <small>Code</small>
          </label>
          <input
            name="code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="isPublic">
            <small>Public</small>
          </label>
          <input
            name="isPublic"
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
        </div>
        <div>
          <button type="submit">Create Room</button>
        </div>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default CreateRoomForm;
