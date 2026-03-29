import dotenv from "dotenv";
import connectDB from "./db/connnection.js";
import app from "./app.js";

dotenv.config();
const connectionPort = process.env.PORT;

if (!connectionPort) {
  console.error("PORT not found. Please check your .env file.");

  process.exit(1);
}

connectDB()
  .then(() => {
    const server = app.listen(connectionPort, () => {
      console.log(`Server is running on port ${connectionPort}`);
    });

    server.on("error", (error) => {
      console.error("Server error:", error);
    });
  })
  .catch((error) => {
    console.error("Failed to start application:", error);
  });

// 1st Apporch
/*
import express from "express";
const app = express();

(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);

        app.on("error", (error) => {
            console.error("Error occured while starting server");
        });

        app.on("listening", () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });

    } catch (error) {
        console.error("Error occured while connecting to database");
    }
})()
    */
