import express from "express";
import { RecipeModel } from "../models/recipe.js";
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
    const recipes = await RecipeModel.find();
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
    });
    // Send the recipes as the response
    res.json({ recipes });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ error: err.message });
  }
});

//SEARCH USERS RECIPES FOR title
router.get("/search-title/:title", async (req, res) => {
  try {
    // Get the title from the route parameters
    const title = req.params.title;
    // Find all recipes that contain the title
    const recipes = await RecipeModel.find({ title });
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
    const searchTerm = req.query.searchTerm;
    const excludeFields = { comments: 0, user: 0, isPublic: 0 };
    const regex = new RegExp(searchTerm, "i"); // create regex to search all fields ignoring case
    const query = {
      $or: [{ title: regex }, { ingredients: regex }, { description: regex }],
    };
    const recipes = await RecipeModel.find(query, excludeFields).exec();
    if (!recipes) {
      return res.status(404).send({ error: "No recipes found" });
    }
    res.send(recipes);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Check if Recipe is a favourite of user
router.get("/favourite/:recipeId", authenticateJWT, async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const isFav = false;

    const usersFavourites = user.favourites;

    for (let i = 0; i < usersFavourites.length; i++) {
      if (usersFavourites[i] === req.params.recipeId) return (isFav = true);
    }
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ error: err.message });
  }
});

// Enter recipe id as favourite for the user
router.patch("/favourite/:recipeId", authenticateJWT, async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    const recipe = await RecipeModel.findOne({
      _id: req.params.recipeId,
    });
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    // If the recipe is not found, return a 404 status code
    user.favourites.push(recipe);
    user.save();
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
