require("dotenv").config();
const Lesson = require("./model/Lesson");
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const ensureUploadDirectoryExists = require("./utils/ensureUploadDir");
const PORT = process.env.PORT || 3500;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const chatRoutes = require("./routes/api/chats");
const messageRoutes = require("./routes/api/messages");
const notificationRoutes = require("./routes/api/notifications");

// Include the http and socket.io modules
const http = require("http");
const { Server } = require("socket.io");

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
    // credentials: true,
  },
});

// Create uploads directory if it doesn't exist
ensureUploadDirectoryExists();

// Serve static files from the uploads directory
const uploadsPath = path.join(__dirname, 'uploads');
console.log('Uploads directory path:', uploadsPath);

// Log middleware for debugging file requests
app.use('/uploads', (req, res, next) => {
  console.log('File request:', {
    url: req.url,
    path: path.join(uploadsPath, req.url)
  });
  next();
});

app.use('/uploads', express.static(uploadsPath, {
  setHeaders: (res, path) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
}));

// Connect to MongoDB
connectDB();

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));
app.use("/payments", require("./routes/api/payments"));
app.use("/recover", require("./routes/api/recoveryemail"));
app.use("/tutors", require("./routes/api/tutors"));
app.use("/users", require("./routes/api/users")); // Users route with its own auth
app.use("/categories", require("./routes/api/category"));
app.use("/popular-courses", require("./routes/api/public"));

app.use(verifyJWT);
app.use("/courses", require("./routes/api/courses"));
app.use("/lessons", require("./routes/api/lessons"));
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);
app.use("/notifications", notificationRoutes);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    // console.log(userData);
    console.log(`User ${userData.ID} connected to socket.io`);
    socket.join(userData.ID);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageReceived) => {
    console.log("new message received");
    var chat = newMessageReceived.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageReceived.sender._id) return;

      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });

  // Handle agreement proposal from the tutor
  socket.on("agreement proposal", ({ chatId, price, studentId }) => {
    // Notify the student with the proposal
    io.to(studentId).emit("receive proposal", { chatId, price });
  });

  // Handle student's response to the agreement
  socket.on("agreement response", ({ chatId, studentId, accepted }) => {
    io.to(chatId).emit("response received", { accepted });
  });

  socket.on("disconnect", (userData) => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
// Start the server and Socket.IO
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
