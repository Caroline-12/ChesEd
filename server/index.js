import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import tutorRoutes from "./routes/tutorRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tutors", tutorRoutes);
app.use("/api/courses", courseRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
