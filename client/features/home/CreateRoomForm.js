import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCreateRoomAsync } from "./createRoomFormSlice";

const CreateRoomForm = () => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("Room Name:", name);
    console.log("Description:", description);
    console.log("Code:", code);
    console.log("Is Public:", isPublic);
    dispatch(fetchCreateRoomAsync({ roomName, description, code, isPublic }));
    setName("");
    setDescription("");
    setCode("");
    setIsPublic(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">
            <small>Chat Name</small>
          </label>
          <input
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
