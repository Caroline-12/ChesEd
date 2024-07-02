import pool from "./db.js"; // Import the database connection pool

import bcryptjs from "bcryptjs"; // Import the bcryptjs library

const register = async (username, email, password) => {
  // Hash password using bcrypt
  const hashedPassword = await bcryptjs.hash(password, 10);

  // SQL query to insert user
  const insertQuery = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *`;
  const values = [username, email, hashedPassword];

  try {
    const result = await pool.query(insertQuery, values);
    return result.rows[0]; // Return the newly created user object
  } catch (error) {
    throw error; // Re-throw the error for handling in the route handler
  }
};

const login = async (username, password) => {
  // SQL query to fetch user by username
  const selectQuery = `SELECT * FROM users WHERE username = $1`;
  const values = [username];

  try {
    const result = await pool.query(selectQuery, values);
    const user = result.rows[0];

    if (!user) {
      throw new Error("Invalid username"); // Handle non-existent user
    }

    // Compare password hashes using bcrypt
    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      throw new Error("Invalid username or password"); // Handle invalid password
    }

    return user; // Return the user object if login is successful
  } catch (error) {
    throw error; // Re-throw the error for handling in the route handler
  }
};

module.exports = { register, login };
