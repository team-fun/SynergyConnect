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

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  socket.on("join_room", ({ code, username }) => {
    socket.join(code);
    console.log(`User with ID: ${socket.id} joined room: ${code}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.code).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});

server.listen(3001, () => {
  console.log("🏃 RUNNING ON http://localhost:3001/ 🤑");
});
