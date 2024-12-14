import express from "express";
import bcrypt from "bcrypt";
import passport from "../config/auth.js";
import User from "../modules/usersSchema.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).send("User registered successfully");
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).send("Error registering user");
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Authentication error:", err);
      return res.status(500).send("An error occurred during authentication");
    }
    if (!user) {
      console.warn("Authentication failed:", info.message);
      return res.status(400).send(info.message);
    }
    req.login(user, (err) => {
      if (err) {
        console.error("Error logging in:", err);
        return res.status(500).send("An error occurred during login");
      }
      console.log("Login successful:", user);
      // Ensure session cookie is set correctly
      return res.status(200).json({ message: "Login successful", user });
    });
    console.log('Session after login:', req.session);  // Log session for debugging
  })(req, res, next);
});

router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).send("Logged out successfully");
  });
});

export default router;