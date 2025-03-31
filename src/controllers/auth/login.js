const bcrypt = require('bcrypt');

const User = require('../../models/user.js');
const createToken = require('../../utils/createToken.js');

const logIn = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ message: "Invalid credentials" });
    res.status(200).json({ userId: user._id, token: createToken({ sub: user._id }) });
};

module.exports = logIn;