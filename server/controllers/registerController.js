const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { email, pwd, username, firstName, lastName } = req.body;
  console.log(`received: ${email}`);
  if (!username || !pwd || !email || !firstName || !lastName)
    return res.status(400).json({ message: "Please input all details." });

  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ email: email }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    //create and store the new user
    const result = await User.create({
      username,
      password: hashedPwd,
      email,
      firstName,
      lastName,
    });

    console.log(result);

    res.status(201).json({ success: `New user ${firstName} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
