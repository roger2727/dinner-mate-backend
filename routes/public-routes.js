import express from "express";
import { RecipeModel } from "../models/recipe.js";
import { CommentModel } from "../models/comment.js";
import authenticateJWT from "../middleware/jwt-auth.js";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const router = express.Router();

// Home Route to get recipes
router.get("/home", async (req, res) => {
    try {
      const randomRecipes = await RecipeModel.aggregate([
        { $match: { isPublic: true } },
        { $sample: { size: 4 } },
      ]);
      const newRecipes = randomRecipes.map((recipe) => {
        recipe.image = cloudinary.url(recipe.image, {
          width: 300,
          height: 300,
          crop: "fill",
        });
        return recipe;
      });
      res.json(newRecipes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

// GETS ALL RECIPES
router.get("/", async (req, res) => {
    try {
      //Find all recipes created by the current user
      const recipes = await RecipeModel.find({ isPublic: true });
      // Send the recipes as the response
      res.json({ recipes });
    } catch (err) {
      console.log("error", err);
      res.status(500).json({ error: err.message });
    }
});

//SEARCH USERS RECIPES FOR SPECIFIC INGREDIENTS
router.get("/search-ingredients", authenticateJWT, async (req, res) => {
    try {
      // Get the ingredients from the query parameters
      const ingredients = JSON.parse(req.query.ingredients);
      // Find all recipes that contain the ingredients
      const recipes = await RecipeModel.find({
        ingredients: { $in: ingredients },
        user: req.user.userId,
      });
      // Send the recipes as the response
      res.json({ recipes });
    } catch (err) {
      console.log("error", err);
      res.status(500).json({ error: err.message });
    }
});

// Get specific recipe and comments
router.get('/:recipeId', async (req, res) => {
    try {
        // const isValid = mongoose.Types.ObjectId.isValid(req.params.recipeId)
        const recipeId = req.params.recipeId;
        const recipe = await RecipeModel.findById(recipeId)
        const comments = await CommentModel.find({
            recipe: recipe
        })
        const publicRating = comments.reduce((total, next) => total + next.userRating, 0) / comments.length;
        console.log(publicRating)
        res.json({ recipe, comments, publicRating })
    } catch (err) {
        console.log("error", err);
        res.status(500).json({ error: err.message });
    }
});

export default router