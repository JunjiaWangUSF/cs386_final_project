import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import auth from "./routes/auth.js";
import passport from "./config/auth.js";
import path from "path"; // Import path module to serve React
import cors from "cors";
import connectDB from "./modules/db.js";
import recommendation from "./routes/recommendation.js";
const app = express();
const port = 8000;
const hostname = "localhost";
connectDB(true, () => {
  console.log("MongoDB connected successfully.");
});

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000", // React frontend URL
    credentials: true,
  })
);
// Middleware for session management
app.use(
  session({
    secret: "yourSecretKey", // Use a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.PRODUCTION === "true", // Only secure in production with HTTPS
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week expiration
      sameSite: "Lax", // 'Lax' for same-site requests
    },
  })
);
// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session()); // Initialize Passport session

app.use("/auth", auth);
app.use("/trip", recommendation);
app.listen(port, () => {
  console.log(`Server running at ${hostname}:${port}`);
});

process.on("SIGINT", () => {
  console.log("SIGINT received. Closing MongoDB connection...");
  connectDB(false, () => {
    console.log("MongoDB connection closed. Exiting...");
    process.exit(0);
  });
});
