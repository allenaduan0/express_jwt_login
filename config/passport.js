const passport = require('passport')
const dotenv = require('dotenv')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../model/user')

dotenv.config()

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
        try{
            let user = await User.findOne({ email: profile.emails[0].value })
            
            if(!user) {
                user = await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    username: profile.emails[0].value.split('@')[0],
                    password: Math.random().toString(36).slice(-8),
                })
            }

            done(null, user)
        
        }catch(err){
            done(err, null)
        }
    } 
))