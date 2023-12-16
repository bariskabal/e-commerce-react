const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// const validateToken = asyncHandler(async (req, res, next) => {
//   let token;
//   let authHeader = req.headers.Authorization || req.headers.authorization;
//   if (authHeader && authHeader.startsWith("Bearer")) {
//     token = authHeader.split(" ")[1];
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//       if (err) {
//         return res.status(401).json("User is not authorized");
//       }
//       req.user = decoded.user;
//       next();
//     });
//     res.status(401).json({ error: "User is authorized or token is missing" });
//   }
//   return res.status(500).json({ error: "token is missing" });
// });

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
  
    try {
      if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // decoded içindeki bilgileri ihtiyacınıza göre kullanabilirsiniz
        req.user = decoded.user;
        next();
      } else {
        return res.status(401).json({ error: "User is not authorized or token is missing" });
      }
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: "Server error" });
    }
  });

module.exports = validateToken;
