const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
}, { versionKey: false });
const User = mongoose.model('User', UserSchema);

module.exports = User;