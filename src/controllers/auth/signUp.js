const User = require("../../models/user");
const bcrypt = require("bcrypt");

const signUp =  async (req, res) => {
  const { email, password } = req.body;
  if (await User.findOne({ email })) return res.status(400).json({ message: "Email already registered" });
  const hashedPw = await bcrypt.hash(password, 10);
  await new User({ email, password: hashedPw }).save();
  res.status(201).json({ message: "User created" });
};

module.exports = signUp;