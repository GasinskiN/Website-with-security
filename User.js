const mongoose = require("mongoose");
const crypto = require("crypto");
require('dotenv').config();
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password: String,
    salt: String,
})


userSchema.methods.setPassword = function() {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.password = crypto.pbkdf2Sync(this.password, this.salt, 1000, 64, "sha512").toString("hex");
}

userSchema.methods.checkPasswordValidity = function(password) {
    const hashedPassword = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
    return this.password === hashedPassword;

}

module.exports = mongoose.model("User", userSchema);