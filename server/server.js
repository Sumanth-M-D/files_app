import mongoose from "mongoose";
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;
const db = process.env.DATABASE;

// Handle uncaught exceptions (e.g., errors thrown without a try-catch)
process.on("uncaughtException", (err) => {
  console.log("UncaughtException!!! 💥💥💥 shutting down...");
  console.log(err);
  process.exit();
});

// Connect to the MongoDB database using mongoose
mongoose
  .connect(db)
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((err) => {
    console.log("Cannot connect to databse");
  });
 
// Start the Express server and listen on the specified port
const server = app.listen(PORT, () => {
  console.log("Server is listening on the port 3000");
});

// Handle unhandled promise rejections (e.g., promise-based errors not caught)
process.on("unhandledRejection", (err) => {
  console.log("Unhandled promise rejection!!! 💥💥 Shutting down...");
  console.log(err);
  server.close(() => {
    process.exit();
  });
});
