import express from "express";
import cors from "cors";

const app = express();
const port = 4001;

// Enable CORS
app.use(cors());

// Parse incoming JSON data
app.use(express.json());

// Root route
app.get("/", (requ, res) => res.send({ info: "Dinner Mate" }));


app.listen(port, () => console.log('App running at http://localhost:${port}/'));


