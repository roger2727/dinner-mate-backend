import request from "supertest";
import jwt from "jsonwebtoken";
import { UserModel } from "../../models/user";
import { RecipeModel } from "../../models/recipe";
import app from "../../app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

describe("DELETE /recipes/delete/:recipeId", () => {
  let testUser;
  let testRecipe;
  let token;
  let fakeRecipeId;
  beforeEach(async () => {
    // Create a new user in the test database
    testUser = new UserModel({
      email: "testero@example.com",
      password: "password",
      username: "testerouser",
    });
    await testUser.save();
    // Generate a token for the test user
    token =
      "Bearer " +
      jwt.sign({ userId: testUser._id }, process.env.JWT_SECRET_KEY);
    // Create a new recipe in the test database
    testRecipe = new RecipeModel({
      title: "Testersad Recipe",
      ingredients: ["ingredient1", "ingredient2"],
      instructions: ["instruction1", "instruction2"],
      category: "Dinner",
      cookingTime: 30,
      servingSize: 4,
      rating: 5,
      vegetarian: true,
      user: testUser._id,
    });
    await testRecipe.save();
    fakeRecipeId = new mongoose.Types.ObjectId();
  });

  it("should delete the specified recipe belonging to the current user and return a 200 status code", async () => {
    const res = await request(app)
      .delete(`/recipes/delete/${testRecipe._id}`)

      .set("Authorization", token)
      .expect(200);
    expect(res.body).toHaveProperty("message", "Recipe successfully deleted");
    // Check if the recipe was actually deleted from the database
    const deletedRecipe = await RecipeModel.findById(testRecipe._id);
    expect(deletedRecipe).toBeNull();
  });

  it("should return a 404 status code if the specified recipe does not exist", async () => {
    const res = await request(app)
      .delete(`/recipes/delete/${fakeRecipeId}`)
      .set("Authorization", token)
      .expect(404);
    expect(res.body).toHaveProperty("error", "Recipe not found");
  });

  afterEach(async () => {
    // Delete the test user and recipe from the test database
    await UserModel.deleteMany({});
    await RecipeModel.deleteMany({});
  });
});
