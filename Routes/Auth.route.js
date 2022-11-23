const express = require("express");
const createHttpError = require("http-errors");
const router = express.Router();
const User = require("../Models/User.model");
const authSchema = require("../lib/validationSchema");

// Routes

// auth/register
// auth/login
// auth/logout
// auth/refresh

router.post("/register", async (req, res, next) => {
  try {
    const { email, password } = await authSchema.validateAsync(req.body);

    const userExists = await User.findOne({ email });
    if (userExists) throw createHttpError.Conflict(`${email} has already been registered`);

    const user = new User({ email, password });
    const savedUser = await user.save();

    res.send(savedUser);
  } catch (error) {
    if (error.isJoi === true) error.status = 422;

    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  res.send("login route");
});

router.post("/refresh", async (req, res, next) => {
  res.send("refresh token route");
});

router.delete("/logout", async (req, res, next) => {
  res.send("logout route");
});

module.exports = router;