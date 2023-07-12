// import io from "socket.io-client";
// import { setElements, updateElement } from "../whiteboardSlice";
// import store from "../../../../app/store";
// import {
//   updateCursorPosition,
//   removeCursorPosition,
// } from "../CursorOverlay/cursorSlice";

// let socket;

// export const connectWithSocketServer = () => {
//   socket = io("http://localhost:3001/");
//   socket.on("connect", () => {
//     console.log("connected to socket.io server");
//   });
//   socket.on("whiteboard-state", (elements) => {
//     console.log("ELEMENTS", elements);
//     store.dispatch(setElements(elements));
//   });
//   socket.on("element-update", (elementData) => {
//     console.log("ELEMENT DATA", elementData);
//     store.dispatch(updateElement(elementData));
//   });
//   socket.on("whiteboard-clear", () => {
//     console.log("CLEARRRED");
//     store.dispatch(setElements([]));
//   });
//   socket.on("cursor-position", (cursorData) => {
//     console.log("CURSOR DATA", cursorData);
//     store.dispatch(updateCursorPosition(cursorData));
//   });
//   socket.on("user-disconnected", (disconnectedUserId) => {
//     console.log("USERID", disconnectedUserId);
//     store.dispatch(removeCursorPosition(disconnectedUserId));
//   });
// };

export const emitElementUpdate = (elementData) => {
  //   console.log("HELLO I WENT OFF");
  //   socket.emit("element-update", elementData);
};

export const emitClearWhiteboard = () => {
  //   socket.emit("whiteboard-clear");
};

export const emitCursorPosition = (cursorData) => {
  //   socket.emit("cursor-position", cursorData);
};
