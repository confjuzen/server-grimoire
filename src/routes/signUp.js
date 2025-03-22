const User = require("../schemas/user");
const bcrypt = require("bcrypt");

const signUp =  async (req, res) => {
  const { email, password } = req.body;
  if (await User.findOne({ email })) return res.status(400).json({ message: "Email already registered" });
  const hashedPw = await bcrypt.hash(password, 10);
  await new User({ email, password: hashedPw }).save();
  res.json({ message: "User created" });
};

module.exports = signUp;