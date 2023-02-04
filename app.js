import express from "express";

import authRoutes from "./routes/auth-routes.js";
import userRecipeRoutes from "./routes/user-recipe-routes.js";
import publicRoutes from "./routes/public-routes.js";
import commentRoutes from "./routes/comment-routes.js";
import cors from "cors";

const app = express();

// Enable CORS
app.use(cors());

// Parse incoming JSON data
app.use(express.json());

// Root route
app.get("/", (requ, res) => res.send({ info: "Dinner Mate" }));

// routes for auth
app.use("/auth", authRoutes);

// routes for user recipes
app.use("/recipes", userRecipeRoutes);

// routes for public recipes
app.use("/public", publicRoutes);

export default app;
