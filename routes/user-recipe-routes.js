import multer from "multer";
import express from "express";
import { RecipeModel } from "../models/recipe.js";
import { UserModel } from "../models/user.js";
import authenticateJWT from "../middleware/jwt-auth.js";
import dotenv from "dotenv";

import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
// import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

dotenv.config();

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

// GETS ALL USERS RECIPES
router.get("/all", authenticateJWT, async (req, res) => {
    try {
      //Find all recipes created by the current user
      const recipes = await RecipeModel.find({ user: req.user.userId });
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

// Post new Recipe
router.post("/", authenticateJWT, async (req, res) => {
  try {
    const {
      title,
      isPublic,
      ingredients,
      instructions,
      category,
      cookingTime,
      servingSize,
      rating,
      vegetarian,
      comments,
    } = req.body;

    const { userId } = req.user;

    console.log("route handler called");
    console.log("finding user");

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    console.log("creating recipe object");

    const recipe = new RecipeModel({
      title,
      isPublic,
      ingredients,
      instructions,
      user: userId,
      category,
      cookingTime,
      servingSize,
      rating,
      vegetarian,
      comments,
    });

    await recipe.save();

    console.log("recipe saved");

    res.send({ recipe });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// upload image to recipe
router.post("/upload-image/:recipeId", authenticateJWT, async (req, res) => {
    try {
      console.log(req.params);
  
      const recipeId = req.params.recipeId;
  
      console.log(recipeId);
      
      const recipe = await RecipeModel.findById(recipeId);
      if (!recipe) {
        return res.status(404).send({ error: "Recipe not found" });
      }
      // Use multer to handle the image file
      const upload = multer({ storage: storage }).single("image");
      upload(req, res, async (err) => {
        if (err) {
          return res.status(500).send({ error: err.message });
        }
        // Use cloudinary to upload the image
        const result = await cloudinary.uploader.upload(req.file.path);
        recipe.image = result.secure_url;
        await recipe.save();
        res.send({ recipe });
      });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
});

// Update user Recipe
router.patch("/update/:recipeId", authenticateJWT, async (req, res) => {
    try {
      // Find the recipe by its ID and the current user's ID
      const recipe = await RecipeModel.findOne({
        _id: req.params.recipeId,
        user: req.user.userId,
      });
  
      // If the recipe is not found, return a 404 status code
      if (!recipe) {
        return res.status(404).json({ error: "Recipe not found" });
      }
  
      // Update the recipe with the new data from the request body
      recipe.title = req.body.title;
      recipe.ingredients = req.body.ingredients;
      recipe.instructions = req.body.instructions;
      recipe.category = req.body.category;
      recipe.cookingTime = req.body.cookingTime;
      recipe.servingSize = req.body.servingSize;
      recipe.rating = req.body.rating;
      recipe.vegetarian = req.body.vegetarian;
      recipe.comments = req.body.comments;
  
      // Save the updated recipe
      await recipe.save();
  
      // Send the updated recipe as the response
      res.json({ recipe });
    } catch (err) {
      console.log("error", err);
      res.status(500).json({ error: err.message });
    }
});

//Delete user recipe
router.delete("/delete/:recipeId", authenticateJWT, async (req, res) => {
    try {
      // Check if the recipeId in the params is a valid ObjectId
      const isValid = mongoose.Types.ObjectId.isValid(req.params.recipeId);
      if (!isValid) {
        return res.status(500).json({ error: "Invalid recipe id" });
      }
  
      // Find and delete the recipe that belongs to the current user and has the specified recipeId
      const recipe = await RecipeModel.findOneAndDelete({
        _id: req.params.recipeId,
        user: req.user.userId,
      });
  
      // If no recipe is found, return a 404 error
      if (!recipe) {
        return res.status(404).json({ error: "Recipe not found" });
      }
  
      // Send a success message as the response
      res.json({ message: "Recipe successfully deleted" });
    } catch (err) {
      console.log("error", err);
      res.status(500).json({ error: err.message });
    }
});

export default router;
  