import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import User from "../modules/usersSchema.js"; // Adjust the path as necessary
import connectDB from "../modules/db.js";
// Local Strategy for Passport (email/password login)
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    }, // Pass the entire request to the callback
    async (req, email, password, done) => {
      try {
        // Check if the user exists in the database
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
          return done(null, false, { message: "Incorrect email or password" });
        }

        // Compare the hashed password in the database with the provided password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: "Incorrect email or password" });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Serialize user to store in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
