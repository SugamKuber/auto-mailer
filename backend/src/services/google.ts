import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from "../models/user";
import IUser from '../interfaces/user';
import dotenv from "dotenv";

dotenv.config();

passport.serializeUser((userData: IUser, done) => {
  done(null, userData);
});

passport.deserializeUser((userData: IUser, done) => {
  try {
    User.findOne({ _id: userData._id }).then((user) => {
      done(null, user);
    });
  } catch (error) {
    console.log(error);
    done(error, null);
  }
});


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ email: profile.emails![0].value });

        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = new User({
          googleId: profile.id!,
          email: profile.emails![0].value,
          displayName: profile.displayName!,
        });

        const check = await newUser.save();
        done(null, { profile });
      } catch (error) {
        console.log(error);
      }
    }
  )
);

export default passport;
