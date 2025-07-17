const User = require("../models/users");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

//CONTROLLER #1. SIGNUP
const register = async (req, res) => {
  const { email, password, repeatPassword } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  if (password !== repeatPassword) {
    return res.status(400).json({ message: "Password Missmatch" });
  }

  const salt = await bcryptjs.genSalt(10);

  const hashedPassword = await bcryptjs.hash(password, salt);

  try {
    const user = await User.create({ email, password: hashedPassword });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRETKey, {
      expiresIn: "3d",
    });

    res
      .status(201)
      .json({ message: "Registered Sucessfully", id: user._id, token });
  } catch (error) {}
};

//CONTROLLER #2. SIGNIN
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "User doest not exist" });
  }

  const isPasswordMatch = await bcryptjs.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(401).json({ message: "Wrong Password" });
  }

  //GENERATE NEW TOKEN
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRETKey, {
    expiresIn: "3d",
  });

  res.status(200).json({ message: "Login Sucessfully", id: user._id, token });
};
//

const getUser = async (req, res) => {
  const user = await User.findById(req.user.userId);

  res
    .status(200)
    .json({ id: user._id, email: user.email, password: user.password });
};

module.exports = { register, login, getUser };

//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODc3OTQ4YmFlNTgxY2Y5YTRlNDkyNWMiLCJpYXQiOjE3NTI2NjcyNzUsImV4cCI6MTc1MjkyNjQ3NX0.yqQYzsPLZ5OXUbWc0Tmdqzd2q04gTO2Qlk-3ch8EM2A"
