import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./database/database.js";
import Note from "./models/Note.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

connectDB();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/notes", async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const newNote = new Note({ title, content, tags });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/notes", async (req, res) => {
  try {
    const findNotes = await Note.find();
    res.status(200).json(findNotes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/notes/:title", async (req, res) => {
  try {
    const { title } = req.params;
    const getNote = await Note.findOne({ title });
    if (!getNote) {
      return res.status(404).json({ message: "La nota solicitada no existe." });
    }
    res.status(200).json(getNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/notes/:title", async (req, res) => {
  try {
    const { title } = req.params;
    const deleteNote = await Note.findOneAndDelete({ title });
    if (!deleteNote) {
      return res
        .status(404)
        .json({ message: "La nota solicitada para borrar no existe" });
    }
    res.status(200).json({ message: "Nota eliminada" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put("/notes/:title", async (req, res) => {
  try {
    const { title } = req.params;
    const updateData = req.body
    const updateNote = await Note.findOneAndUpdate({ title }, updateData, {new: true});
    if (!updateNote) {
      return res
        .status(404)
        .json({ message: "La nota solicitada para actualizar no existe" });
    }
    res.status(200).json(updateNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(4000, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
