import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./database/database.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

connectDB();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(4000, () => {
  console.log(`Server is running on:${PORT}`);
});
