import request from "supertest";
import { CommentModel } from "../../models/comment";
import mongoose from "mongoose";

describe("CommentModel", () => {
  it("should save a comment", async () => {
    const comment = new CommentModel({
      title: "Test Comment",
      commentText: "This is a test comment",
      user: mongoose.Types.ObjectId(),
      userRating: 8,
      recipe: mongoose.Types.ObjectId(),
    });

    await comment.save();

    const savedComment = await CommentModel.findOne({ title: "Test Comment" });
    expect(savedComment).toBeDefined();
    expect(savedComment.title).toBe("Test Comment");
  });
});
