const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const corsOptions = {
  origin: "http://localhost:8080",
};

app.use(cors(corsOptions));

const server = http.createServer(app);

const io = new Server(server, {
  cors: corsOptions,
});

let elements = [];

const roomUsers = {};

const updateElementInElements = (elementData) => {
  const index = elements.findIndex((element) => element.id === elementData.id);
  if (index === -1) return elements.push(elementData);

  elements[index] = elementData;
};

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  socket.on("join_room", ({ code, username }) => {
    socket.join(code);
    console.log(`User with ID: ${socket.id} joined room: ${code}`);

    if (!roomUsers[code]) {
      roomUsers[code] = [];
    }
    roomUsers[code].push({ id: socket.id, username });

    io.to(code).emit("user_list", roomUsers[code]);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.code).emit("receive_message", data);
  });

  socket.on("leave_room", (code) => {
    if (roomUsers[code]) {
      roomUsers[code] = roomUsers[code].filter((user) => user.id !== socket.id);

      io.to(code).emit("user_list", roomUsers[code]);
    }
    socket.leave(code);
  });

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
  });

  io.to(socket.id).emit("whiteboard-state", elements);

  socket.on("element-update", (elementData) => {
    updateElementInElements(elementData);

    socket.broadcast.emit("element-update", elementData);
  });

  socket.on("whiteboard-clear", () => {
    elements = [];
    socket.broadcast.emit("whiteboard-clear");
  });

  socket.on("cursor-position", (cursorData) => {
    socket.broadcast.emit("cursor-position", {
      ...cursorData,
      userId: socket.id,
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    for (const code in roomUsers) {
      roomUsers[code] = roomUsers[code].filter((user) => user.id !== socket.id);
      io.to(code).emit("user_list", roomUsers[code]);
    }
    socket.broadcast.emit("user-disconnected", socket.id);
  });
});

// ************************ WHITE BOARD BEGIN ************************

// app.get('/', (req, res) => {
//   res.send('<h1>Hello server is working</h1>');
// });

// ************************ WHITE BOARD END ************************

server.listen(3001, () => {
  console.log("🏃 RUNNING ON http://localhost:3001/ 🤑");
});
