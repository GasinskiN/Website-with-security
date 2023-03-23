# Website-with-security
This is a node.js app

This is a website where i am implementing different levels of security.


First level was - plain text passwords (not very secure)
Second level - encryption (better but still bad)
third level - hashing algorithm sha 512 (pretty good but it is a fast algorithm so a dictionary attack is pretty easy)
fourth level - hashing algorithm bcrypt (good security a slow hashing algorithm not as susceptible to dictionary attacks)
fifth level - authorization with passport keeping authorization cookies such things (also good security more of a industry standard)

current node modules: express, ejs, mongoose, express-session, passport, passport-local-mongoose

To begin development clone the repository, install the required packages, run a mongodb server on localhost and run the app.js file using node  
