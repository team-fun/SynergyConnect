import io from "socket.io-client";
import { setElements, updateElement } from "../whiteboardSlice";
import store from "../../../../app/store";
import {
  updateCursorPosition,
  removeCursorPosition,
} from "../CursorOverlay/cursorSlice";

let socket;

export const connectWithSocketServer = () => {
  socket = io("http://localhost:3001/");
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
  socket.on("cursor-position", (cursorData) => {
    store.dispatch(updateCursorPosition(cursorData));
  });
  socket.on("user-disconnected", (disconnectedUserId) => {
    store.dispatch(removeCursorPosition(disconnectedUserId));
  });
};

export const emitElementUpdate = (elementData) => {
  socket.emit("element-update", elementData);
};

export const emitClearWhiteboard = (code) => {
  socket.emit("whiteboard-clear", code);
};

export const emitCursorPosition = (cursorData) => {
  socket.emit("cursor-position", cursorData);
};
