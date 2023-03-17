const express = require("express");
const ejs = require("ejs");
const app = express();

app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.render("home");
});

app.get("/login", function(req, res){
    res.render("login");
});

app.get("/register", function(req, res){
    res.render("register");
});


app.listen(3000, function(){
    console.log("Server running on port 3000");
});
