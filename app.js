// require all necessary modules
const express = require("express");
const ejs = require("ejs");
require('dotenv').config();
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require(__dirname + "/User");
const app = express();

// configure express
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

// configure passport
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

// Oauth with google passport strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets"
  },
  async function(accessToken, refreshToken, profile, done) {
      try {
        const user = await User.findOne({ googleId: profile.id });
        if(!user) {
            const newUser = await User.create({
                username: profile.displayName,
                googleId: profile.id
            })
            return done(null, newUser);
        } else {
            return done(null, user);
        }
    } catch (error) {
        return done(err);
    }
    }

));

// connect to mongoDB
async function connectMongoDB(){
    await mongoose.connect('mongodb://127.0.0.1:27017/loginDataDB');
}

connectMongoDB();

// home route
app.get("/", function(req, res){
    res.render("home");
});

// google authenticatin routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/secrets', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/secrets');
});


// login route
app.route("/login")

.get(function(req, res){
    res.render("login");
})
.post(async function(req, res){
    passport.authenticate("local") (req, res, function(){
        res.redirect("/secrets");
    })

});

// register route
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


// Submit route
app.route("/submit")

.get(function(req, res){
    if (req.isAuthenticated()) {
        res.render("submit");
    }
    else {
        res.redirect("/login");
    }
})

.post(async function(req, res){
    
    const submittedSecret = req.body.secret;
    try {
        currentUser = await User.findById(req.user.id);
        currentUser.secret = submittedSecret;
        await currentUser.save();
        res.redirect("secrets")
    } catch (error) {
        console.log(error.message);
    }

});


// logout 
app.post("/logout", function(req, res){
    req.logout(function(err){
        if (err){
            console.log(err);
        } 
        res.redirect("/");
    });
});

// secrets route
app.get("/secrets", async function(req, res){
    if (req.isAuthenticated()){
        const users = await User.find({ secret: { $ne: null } });
        const usersSecrets = [];
        users.forEach((el) => {
            usersSecrets.push(el.secret);
        })
        console.log(usersSecrets);
        res.render("secrets", {usersSecrets: usersSecrets});
    } else {
        res.redirect("/login");
    }
});

app.route("/bridge/:bridgeID")

.get(async function(req, res){
    if (req.isAuthenticated()){
        
    }
})
.post(async function(req, res){
    if (req.isAuthenticated()){

    }
})

.put(async function(req, res){
    if (req.isAuthenticated()){

    }
})

// Turn on the server on port 3000
app.listen(3000, function(){
    console.log("Server running on port 3000");
});
