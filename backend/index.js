import express from 'express';
import dotenv from 'dotenv';
import mongoose from'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
dotenv.config();

const PORT = 5555 || process.env.PORT;

const app = express();

/** ############ Middlewares ############
 * 1- This middleware is used to handle JSON-encoded bodies.
 * 2- Mounts the books route at the '/books' path.
 * 3- Enables CORS (Cross-Origin Resource Sharing) for the Express.js application.
 */
app.use(express.json());
app.use("/books", booksRoute);
app.use(cors());

/**
 * Handles the root route '/' and sends a welcome message to the client.
 */
app.get("/", (req, res) => {
  res.send("Welsome to our books store!");
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