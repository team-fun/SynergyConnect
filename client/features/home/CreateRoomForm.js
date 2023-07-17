import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCreateRoomAsync } from "./createRoomFormSlice";
import Modal from "react-modal";

Modal.setAppElement("#app");

const CreateRoomForm = () => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [roomCodeToShow, setRoomCodeToShow] = useState("");

  const hasher = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    function generateString(length) {
      let result = "";
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }

      return result;
    }
    const hash = generateString(7);
    return hash;
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const roomCode = isPublic ? code : hasher();
    setRoomCodeToShow(roomCode);
    setShowCode(!isPublic);
    dispatch(
      fetchCreateRoomAsync({ name, description, code: roomCode, isPublic })
    );
    setName("");
    setDescription("");
    setCode("");
    setIsPublic(false);
  };

  return (
    <div>
      <Modal
        isOpen={showCode}
        onRequestClose={() => setShowCode(false)}
        contentLabel="Private Code"
        className="custom-modal"
      >
        <h2>Here is your private code!</h2>
        <p>Share it wisley!</p>
        <p>Room Code: {roomCodeToShow}</p>
        <button onClick={() => setShowCode(false)}>Close</button>
      </Modal>
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
        {isPublic ? (
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
        ) : (
          <div>Room code will be hashed for security if private!</div>
        )}
        <div>
          <button type="submit">submit</button>
        </div>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default CreateRoomForm;
