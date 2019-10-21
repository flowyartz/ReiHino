const mongoose = require('mongoose');
const user = mongoose.Schema({
    user: String,
    xp: Number,
    level: Number,
});

module.exports = mongoose.model("User", user)