const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const User = require(__dirname + "/User");
const app = express();

app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: "i am aware that a lot of",
    resave: false, 
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
    passport.authenticate("local") (req, res, function(){
        res.redirect("/secrets");
    })

});

app.route("/register")

.get(function(req, res){
    res.render("register");
})

.post(async function(req, res){
    User.register({username: req.body.username}, req.body.password, function(err, user){
        if (err) {
            console.log(err);
            res.redirect("register");
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secrets");
            })
        }
    })
});

app.get("/secrets", function(req, res){
    if (req.isAuthenticated()){
        res.render("secrets");
    } else {
        res.redirect("/login");
    }
})

app.listen(3000, function(){
    console.log("Server running on port 3000");
});
