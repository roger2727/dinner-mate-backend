import express from "express";
import { RecipeModel } from "../models/recipe.js";
import authenticateJWT from "../middleware/jwt-auth.js";
import dotenv from "dotenv";

import { CommentModel } from "../models/comment.js";

dotenv.config();

const router = express.Router();

// Get all comments for recipe
router.get('/comments/:recipe', async (req, res) => {
    try {
        // const title = JSON.parse(req.query.title);

        const comments = await CommentModel.find({ 
            recipe: req.params.recipe
        })
        
        res.json({ comments })
    } catch (err) {
        console.log("error", err);
        res.status(500).json({ error: err.message });
    }
});

// Create new comment for recipe
router.post('/:recipe/add', authenticateJWT, async (req, res) => {
    try {
        const { title, commentText, userRating } = req.body;
        const { userId } = req.user;
        const recipeId = await RecipeModel.find({ recipeId: req.params.recipeId });
        const comment = new CommentModel({
            title,
            commentText,
            userRating,
            user: userId,
            recipe: recipeId
        });
        await comment.save();
        res.send({ comment });
    } catch (err) {
        res.status(500).send({ error: error.message });
    }
});

export default router;