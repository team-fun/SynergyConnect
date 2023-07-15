import io from "socket.io-client";
import { setElements, updateElement } from "../whiteboardSlice";
import store from "../../../../app/store";

let socket;

export const connectWithSocketServer = () => {
  socket = io("https://synergy-connect.onrender.com");

  socket.on("connect", () => {
    console.log("connected to socket.io server");
  });

  socket.on("whiteboard-state", (elements) => {
    store.dispatch(setElements(elements));
  });

  socket.on("element-update", (elementData) => {
    store.dispatch(updateElement(elementData));
  });

  socket.on("whiteboard-clear", () => {
    store.dispatch(setElements([]));
  });
};

export const emitElementUpdate = (elementData) => {
  socket.emit("element-update", elementData);
};

export const emitClearWhiteboard = () => {
  socket.emit("whiteboard-clear");
};

export const emitCursorPosition = (cursorData) => {
  socket.emit("cursor-position", cursorData);
};
