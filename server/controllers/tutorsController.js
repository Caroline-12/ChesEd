const User = require("../model/User");

const getAllTutors = async (req, res) => {
  console.log("Getting all tutors");
  const users = await User.find({ "roles.Editor": { $exists: true } });
  if (!users || users.length === 0) {
    return res.status(204).json({ message: "No users with Editor role found" });
  }
  res.json(users);
};

module.exports = { getAllTutors };
