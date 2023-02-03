import express from "express";
import { RecipeModel } from "../models/recipe.js";
import { CommentModel } from "../models/comment.js";
import { UserModel } from "../models/user.js";
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
        width: 1000,
        height: 1000,
        crop: "fit",
      });
      return recipe;
    });
    res.json(newRecipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GETS ALL RECIPES
router.get("/all", async (req, res) => {
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
router.get("/search-ingredients", async (req, res) => {
  try {
    // Get the ingredients from the query parameters
    const ingredients = JSON.parse(req.query.ingredients);
    // Find all recipes that contain the ingredients
    const recipes = await RecipeModel.find({
      ingredients: { $in: ingredients },
      isPublic: true,
    });
    // Send the recipes as the response
    res.json({ recipes });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ error: err.message });
  }
});

//SEARCH USERS RECIPES FOR title
router.get("/search-title", async (req, res) => {
  try {
    // Get the ingredients from the query parameters
    const title = JSON.parse(req.query.title);
    // Find all recipes that contain the ingredients
    const recipes = await RecipeModel.find({
      title: { $in: title },
      isPublic: true,
    });
    // Send the recipes as the response
    res.json({ recipes });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ error: err.message });
  }
});

// Get specific recipe and comments
router.get("/:recipeId", async (req, res) => {
  try {
    // const isValid = mongoose.Types.ObjectId.isValid(req.params.recipeId)
    const recipeId = req.params.recipeId;
    const recipe = await RecipeModel.findById(recipeId);
    const comments = await CommentModel.find({
      recipe: recipe,
    });
    const publicRating =
      comments.reduce((total, next) => total + next.userRating, 0) /
      comments.length;
    console.log(publicRating);
    res.json({ recipe, comments, publicRating });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ error: err.message });
  }
});

// route to get recipes by category
router.get("/category/:category", (req, res) => {
  RecipeModel.find({ category: req.params.category }, (err, recipes) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(recipes);
    }
  });
});

router.get("/search-all", async (req, res) => {
  try {
    const query = req.query;
    const excludeFields = { comments: 0, user: 0, isPublic: 0 };
    const recipes = await RecipeModel.find(query, excludeFields).exec();
    res.send(recipes);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/favourite/:recipeId", authenticateJWT, async (req, res) => {
  try {
    // Find the recipe by its ID and the current user's ID
    const recipe = await RecipeModel.findOne({
      _id: req.params.recipeId
    });

    if (!recipe) {
          return res.status(404).json({ error: "Recipe not found" });
        }

    const { userId } = req.user;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    // If the recipe is not found, return a 404 status code
    user.favourites = [... recipe]
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ error: err.message });
  }
})

export default router;
