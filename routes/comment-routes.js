import express from "express";
import { RecipeModel } from "../models/recipe.js";
import authenticateJWT from "../middleware/jwt-auth.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { CommentModel } from "../models/comment.js";

dotenv.config();

const router = express.Router();

// Get all comments for recipe
router.get('/:recipeId', async (req, res) => {
    try {
        // const isValid = mongoose.Types.ObjectId.isValid(req.params.recipeId)
        const recipeId = req.params.recipeId;
        const recipe = await RecipeModel.findById(recipeId)
        const comments = await CommentModel.find({
            recipe: recipe
        })        
        res.json({ comments })
    } catch (err) {
        console.log("error", err);
        res.status(500).json({ error: err.message });
    }
});

// Create new comment for recipe
router.post('/add/:recipeId', authenticateJWT, async (req, res) => {
    try {
        const { title, commentText, userRating } = req.body;
        const { userId } = req.user;
        const recipeId = req.params.recipeId;
        const recipe = await RecipeModel.findById(recipeId)
        const comment = new CommentModel({
            title,
            commentText,
            userRating,
            user: userId,
            recipe: recipe
        });
        await comment.save();
        res.send({ comment });
    } catch (err) {
        res.status(500).send({ error: error.message });
    }
});

export default router;