const mongoose = require('mongoose');
const general = mongoose.Schema({
    prefix: String,
    guild: String,
});

module.exports = mongoose.model("General", general)