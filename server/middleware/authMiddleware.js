import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    console.log("SECRET_KEY:", process.env.SECRET_KEY);
    console.log("token:", token);
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("decoded:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("SECRET_KEY:", process.env.SECRET_KEY);
    console.log("token:", token);
    res.status(400).json({ message: "Invalid token." });
  }
};

export default authenticateJWT;
