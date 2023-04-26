const { Server } = require("socket.io");

// listen to port 3000
const io = new Server(3000, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("Socket.io connected to socket: " + socket.id);

  // socket.on("create-event", (value) => {
  //   console.log("Received foo event: " + value);
  //   io.emit("foo", value);
  // });

  socket.on("from-controller", (value) => {
    console.log("Received from controller: " + value);
    io.emit("to-monitor", value);
  });
});
