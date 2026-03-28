import dotenv from "dotenv";
import connectDB from "./db/connnection.js";

dotenv.config();
connectDB();







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