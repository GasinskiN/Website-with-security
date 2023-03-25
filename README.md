# Website-with-security
This is a node.js app

This is a website where i am implementing different levels of security.

First level was - plain text passwords (not very secure)
Second level - encryption (better but still bad)
third level - hashing algorithm sha 512 (pretty good but it is a fast algorithm so a dictionary attack is pretty easy)
fourth level - hashing algorithm bcrypt (good security a slow hashing algorithm not as susceptible to dictionary attacks)
fifth level - authorization with passport keeping authorization cookies such things (also good security more of a industry standard)
Sixth level - OAuth 2.0 with google

current node modules: express, ejs, mongoose, express-session, passport, passport-local-mongoose, passport-google-oauth20

To begin development clone the repository, install the required packages, get an account on google cloud and acquire OAuth 2.0 client id and client key put them into your environemntal variables under "GOOGLE_CLIENT_ID" and "GOOGLE-CLIENT_SECRET" respectively. Your authorized JS origins should be "http://localhost:3000" and Authorized redirect URLs should be "http://localhost:3000/auth/google/secrets" than you need to  run a mongodb server on localhost, and finally run the app.js file using node  
