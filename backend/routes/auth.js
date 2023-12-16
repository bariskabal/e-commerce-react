const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, role, avatar } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser == null) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role,
        avatar,
      });
      await newUser.save();
      return res.status(200).json(newUser);
    } else {
      return res.status(401).json({ error: "Bu mail zaten kayıtlı" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          user: {
            username: user.username,
            email: user.email,
            id: user._id,
          },
          roles: user.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1m" }
      );
      return res.status(200).json({ accessToken });
    }
    return res
      .status(401)
      .json({ error: "Kullanıcı bulunamadı veya şifre hatalı" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/checkUser", async (req, res) => {
  try {
    return async (req, res) => {
      // JWT'nin alınması
      let token;
      let authHeader = req.headers.authorization || req.headers.Authorization;
      try {
        token = authHeader.split(" ")[1];
        const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // decoded içindeki bilgileri ihtiyacınıza göre kullanabilirsiniz
        if (decoded.roles == requiredRole) {
          return res.status(200).json({ message: 'Success.' });
        } else {
          return res.status(403).json({ message: 'Yetkiniz yok.' });
        }
      } catch (err) {
        return res.status(500).json({ error: "Server error" });
      }
    };
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
