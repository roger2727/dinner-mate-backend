import request from "supertest";
import jwt from "jsonwebtoken";
import { UserModel } from "../../models/user";
import { RecipeModel } from "../../models/recipe";
import app from "../../app.js";
import dotenv from "dotenv";
dotenv.config();

describe("POST recipes/add", () => {
  let userId;
  let recipeId;
  let response;
  beforeEach(async () => {
    const user = new UserModel({
      email: "testing@example.com",
      password: "password123",
      username: "testinguser",
    });
    await user.save();
    userId = user._id;
    // Create a token for the user
    const authToken =
      "Bearer " + jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
    // Send a POST request to the /add route with the recipe data and the Authorization header set with the token
    response = await request(app)
      .post("/recipes/add")
      .set("Authorization", authToken)
      .send({
        title: "Test Recipe",
        ingredients: ["Ingredient 1", "Ingredient 2"],
        instructions: ["Step 1", "Step 2"],
        category: "Dinner",
        cookingTime: 30,
        servingSize: 2,
        rating: 5,
        // vegetarian: true,
        // isPublic: true,
      });

    recipeId = response.body.recipe._id;
  });
  it("should create a new recipe", async () => {
    expect(response.statusCode).toBe(200);
    expect(response.body.recipe).toBeDefined();
    expect(response.body.recipe.title).toBe("Test Recipe");
  });
  afterEach(async () => {
    await UserModel.findOneAndDelete({ email: "testing@example.com" });
    await RecipeModel.deleteOne({ _id: recipeId });
  });
});
