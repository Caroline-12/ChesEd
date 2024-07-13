import jwt from "jsonwebtoken";
import prisma from "../prisma.js";
import { hashPassword, comparePassword } from "../utils/hashPassword.js";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => {
  console.log("Register request received:", req.body);
  const { username, firstName, lastName, email, password, role } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        firstName,
        lastName,
        email,
        role,
      },
    });

    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
      token,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Login request received for email:", email);

    const user = await prisma.user.findUnique({ where: { email } });
    console.log("User found:", user);

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await comparePassword(password, user.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("SECRET_KEY:", process.env.SECRET_KEY);

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
