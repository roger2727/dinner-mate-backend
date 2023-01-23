import express from "express";
import { RecipeModel } from "../models/recipe.js";
import authenticateJWT from "../middleware/jwt-auth.js";
import { CommentModel } from "../models/comment.js";
import dotenv from "dotenv";
import mongoose from "mongoose";


dotenv.config();

const router = express.Router();

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

// Delete users comment
router.delete("/delete/:commentId", authenticateJWT, async (req, res) => {
    try {
        const isValid = mongoose.Types.ObjectId.isValid(req.params.commentId);
        if (!isValid) {
            return res.status(500).json({ error: "Invalid recipe id" });
        }

        // Find and delete the recipe that belongs to the current user and has the specified recipeId
        const comment = await CommentModel.findOneAndDelete({
            _id: req.params.commentId,
            user: req.user.userId,
        });
        // If no recipe is found, return a 404 error
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        // Send a success message as the response
        res.json({ message: "Comment successfully deleted" });
    } catch (err) {
        console.log("error", err);
        res.status(500).json({ error: err.message });
    }   
})

export default router;