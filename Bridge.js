const mongoose = require("mongoose");
const bridgeSchema = new mongoose.Schema({
    
    bridgeInfo: String,
    comments: [{
        content: String,
        likes: Number,
        dislikes: Number,
        date: Date
    }],
})

module.exports = mongoose.model("Bridge", userSchema);