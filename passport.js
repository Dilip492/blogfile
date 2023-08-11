const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport')
const userModel = require('./models/user')
// const jwt = require('jsonwebtoken')
require('dotenv').config()

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/google/callback"
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            // const user = {
            //   ,
            //   displayName: profile.displayName,
            //   email: profile.emails[0].value
            // };
            // await user.save()
            const user = await userModel.findOne({googleId: profile.id })
            if (user) {
                
                console.log("user is " , user)
                

            } else {
                const user = new userModel({
                    name: profile.displayName,
                    googleId: profile.id,
                    email: profile.emails[0].value
                })
                await user.save()

            }


            // console.log(user);
   
            return done(null, profile);
        } catch (error) {
            // Handle the error
            console.error(error);
            return done(error);
        }
    }));



passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser(function (user, done) {
    done(null, user)
})