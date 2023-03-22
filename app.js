const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const User = require(__dirname + "/User");
const app = express();

app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

async function connectMongoDB(){
    await mongoose.connect('mongodb://127.0.0.1:27017/loginDataDB');
}

connectMongoDB();

app.get("/", function(req, res){
    res.render("home");
});

app.route("/login")

.get(function(req, res){
    res.render("login");
})
.post(async function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    try {
        const existingUser = await User.findOne({username: username});
        if (existingUser === null) {
            res.status(400).send("User not found");

        } else{

            if(existingUser.checkPasswordValidity(password)){
                res.render("secrets");
            } 
            else{
                res.status(400).send("Wrong password");
            }
        }

    } catch (error) {
        res.render(error.message);
    }

});

app.route("/register")

.get(function(req, res){
    res.render("register");
})

.post(async function(req, res){
    try {
        const newUser = new User({
            username: req.body.username,
            password: req.body.password
        })

        newUser.setPassword();
        await newUser.save();
        res.render("secrets");
        
    } catch (error) {
        res.send(error.message);
    }   
});


app.listen(3000, function(){
    console.log("Server running on port 3000");
});
