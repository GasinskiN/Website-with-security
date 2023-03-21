const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
require('dotenv').config();
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
})

const secret = process.env.MY_KEY;
userSchema.plugin(encrypt, { secret: secret, encryptedFields: ["password"]});

module.exports = mongoose.model("User", userSchema);