const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY || "mysecretkey";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    req.user = jwt.verify(token, SECRET_KEY);
    console.log('token valid', req.user);
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;

