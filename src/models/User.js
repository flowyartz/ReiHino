const mongoose = require('mongoose');
const user = mongoose.Schema({
    user: String,
    description: String,
    xp: Number,
    level: Number,
    coins: Number
});

module.exports = mongoose.model("User", user)