import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import auth from "./routes/auth.js";
import passport from "./config/auth.js";
import path from "path"; // Import path module to serve React
import cors from "cors";
import connectDB from "./modules/db.js";
import recommendation from "./routes/recommendation.js";
import share from "./routes/share.js";

const app = express();
const port = 8000;
const hostname = "localhost";

// Connect to MongoDB
connectDB(true, () => {
  console.log("MongoDB connected successfully.");
});

// Middlewares
app.use(express.json()); // Body parser for JSON
app.use(express.urlencoded({ extended: true })); // Body parser for URL-encoded forms
app.use(
  cors({
    origin: "http://localhost:3000", // Ensure this matches your frontend's URL
    credentials: true, // Allow credentials (cookies) to be sent cross-origin
  })
);
app.use(cookieParser()); // Cookie parser for managing cookies

// Session management should come after cookieParser
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);

// Passport middleware (initialize and use session)
app.use(passport.initialize());
app.use(passport.session()); // Initialize Passport session

// Routes
app.use("/auth", auth);
app.use("/trip", recommendation);
app.use("/trip", share);

// Start server
app.listen(port, () => {
  console.log(`Server running at ${hostname}:${port}`);
});

// Graceful shutdown on SIGINT
process.on("SIGINT", () => {
  console.log("SIGINT received. Closing MongoDB connection...");
  connectDB(false, () => {
    console.log("MongoDB connection closed. Exiting...");
    process.exit(0);
  });
});
