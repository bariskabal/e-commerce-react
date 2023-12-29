const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { isAdmin, isUser } = require("../middleware/checkUserRole");
const validateToken = require("../middleware/validateTokenHandler");

const getRoles = async (authHeader, req, res) => {
  let token;
  token = authHeader.split(" ")[1];
  const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  return decoded.roles;
};

const getUserId = async (authHeader, req, res) => {
  let token;
  token = authHeader.split(" ")[1];
  const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  console.log(decoded)
  return decoded.user.id;
};

router.get("/currentUserRoles", async (req, res) => {
  try {
    let authHeader = req.headers.authorization || req.headers.Authorization;
    const roles = await getRoles(authHeader);
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/currentUserInfo", async (req, res) => {
  try {
    let authHeader = req.headers.authorization || req.headers.Authorization;
    const userId = await getUserId(authHeader);
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/", validateToken, isAdmin, async (req, res) => {
  try {
    const users = await User.find(); // tüm verileri getirir
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId); // tüm verileri getirir
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:email", validateToken, isAdmin, async (req, res) => {
  try {
    const email = req.params.email;
    const deletedUser = await User.findOneAndDelete({ email });
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
