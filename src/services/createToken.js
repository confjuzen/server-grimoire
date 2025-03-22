const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY || "mysecretkey";

const createToken = (data) => jwt.sign(data, SECRET_KEY, { expiresIn: '600m' });

module.exports = createToken;