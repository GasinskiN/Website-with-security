const mongoose = require("mongoose");
require('dotenv').config();
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password: String,
})


module.exports = mongoose.model("User", userSchema);