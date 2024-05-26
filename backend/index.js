import express from 'express';
import dotenv from 'dotenv';
import mongoose from'mongoose';
import { Book } from './models/bookModel.js';
dotenv.config();

const PORT = 5555 || process.env.PORT;

const app = express();

app.get('/', (req, res) => {
    res.send("Hello Woeld!");
});

// Handles the creation of a new book in the system
app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      res
        .status(400)
        .send({ message: "Please provide all the required fields" });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
}).then(() => {
    app.listen( PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
    });
}).catch(err => {
    console.log(err);
});