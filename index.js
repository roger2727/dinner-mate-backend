import express from "express";
import authRoutes from "./routes/auth-routes.js";
import recipeRoutes from "./routes/recipe-routes.js";
import cors from "cors";

const app = express();
const port = 4001;

// Enable CORS
app.use(cors());

// Parse incoming JSON data
app.use(express.json());

// Root route
app.get("/", (requ, res) => res.send({ info: "Dinner Mate" }));

// routes for auth
app.use("/auth", authRoutes);

// routes for recipes
app.use('/recipes', recipeRoutes)

app.listen(port, () => console.log('App running at http://localhost:${port}/'));


