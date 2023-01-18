import express from "express";

const app = express();
const port = 4001;

app.listen(port, () => console.log('App running at http://localhost:${port}/'));


