import express from "express";
const PORT = 5555;

const app = express();

app.get('/', (req, res) => {
    res.send("Hello Woeld!");
});

app.listen( PORT, () => {
    console.log(`App is listening to port: ${PORT}`);
});