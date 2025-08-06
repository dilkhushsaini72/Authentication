const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).send({ message: "All fields are required*" });
    }
    const isAlreadyEmail = await User.findOne({ email });
    if (isAlreadyEmail) {
      return res.status(400).send({ message: "Email already taken ::" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashPassword,
    });

    await user.save();
    res.status(201).send({ message: "registration successfully.." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ message: "All fields are required*" });
    }
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(400).send({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, checkUser.password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: checkUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successful", user: checkUser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const homeController = async (req, res) => {
  try {
    res.status(200).json({ message: "Welcome to the home page" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const loggedOutController = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  registerController,
  loginController,
  loggedOutController,
  homeController,
};
