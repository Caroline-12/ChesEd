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
const PORT = process.env.PORT || 3500;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const UserStatus = require("./model/UserStatus");
const chatController = require("./controllers/chatController");
const chatRoutes = require("./routes/api/chatRoutes");
// Include the http and socket.io modules
const http = require("http");
const { Server } = require("socket.io");

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: corsOptions.origin,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// app.post("/create-checkout-session", async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//         price: "{{PRICE_ID}}",
//         quantity: 1,
//       },
//     ],
//     mode: "payment",
//     success_url: `${YOUR_DOMAIN}?success=true`,
//     cancel_url: `${YOUR_DOMAIN}?canceled=true`,
//   });

//   res.redirect(303, session.url);
// });

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
// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));
app.use("/payments", require("./routes/api/payments"));

// app.use("/forgot", require("./routes/forgot"));
// app.use("/reset", require("./routes/reset"));
app.use("/categories", require("./routes/api/category"));
app.use("/popular-courses", require("./routes/api/public"));
app.use(verifyJWT);
app.use("/users", require("./routes/api/users"));
app.use("/courses", require("./routes/api/courses"));
app.use("/lessons", require("./routes/api/lessons"));
app.use("/tutors", require("./routes/api/tutors"));
app.use("/chat", chatRoutes);

app.post("/create-checkout-session", async (req, res) => {
  const { lessonId } = req.body;
  console.log(lessonId);
  if (!lessonId) {
    return res.status(400).send({
      error: {
        message: "Lesson ID is required",
      },
    });
  }

  try {
    // Assuming you have a function to get the agreed price of a lesson
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).send({
        error: {
          message: "Lesson not found",
        },
      });
    }

    const amount = lesson.agreedPrice; // Get the agreed price of the lesson
    console.log(amount);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Lesson",
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/payment-success/${lessonId}`,
      cancel_url: `${process.env.CLIENT_URL}/payment-failure`,
    });
    res.json({
      url: session.url,
    });
  } catch (e) {
    return res.status(500).send({
      error: {
        message: e.message,
      },
    });
  }
});

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
  console.log("A user connected:", socket.id);

  // Join the room
  socket.on("joinRoom", ({ roomId, userType }) => {
    socket.join(roomId);
    console.log(`${userType} joined room: ${roomId}`);
  });

  // Listen for messages and broadcast them to the room
  socket.on("sendMessage", ({ roomId, message }) => {
    io.to(roomId).emit("receiveMessage", message);
    console.log(`Message from ${message.sender}: ${message.content}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start the server and Socket.IO
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
