// Örnek bir JWT kontrol middleware
const jwt = require("jsonwebtoken");

const checkUserRole = (requiredRole) => {
  return async (req, res, next) => {
    // JWT'nin alınması
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    try {
      token = authHeader.split(" ")[1];
      const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      // decoded içindeki bilgileri ihtiyacınıza göre kullanabilirsiniz
      if (decoded.roles == requiredRole) {
        next();
      } else {
        return res.status(403).json({ message: 'Yetkiniz yok.' });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Server error" });
    }
  };
};

// Kullanıcı rol kontrolü örneği
const isAdmin = checkUserRole("admin");
const isUser = checkUserRole("user");

module.exports = { isAdmin, isUser };
