import mongoose from "mongoose";
import mongooseConnection from "../db.js";

const commentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    commentText: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    userRating: {
        type: Number,
        min: 0,
        max: 10,
        required: true,
    },
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'recipe'
    }

})

const CommentModel = mongooseConnection.model("Comment", commentSchema);

export { CommentModel };