import request from "supertest";
import { RecipeModel } from "../../models/recipe";
import mongoose from "mongoose";

describe("RecipeModel", () => {
  it("should save a recipe", async () => {
    const recipe = new RecipeModel({
      title: "Test Recipe",
      ingredients: ["Ingredient 1", "Ingredient 2"],
      instructions: ["Step 1", "Step 2"],
      category: "Dinner",
      user: mongoose.Types.ObjectId(),
      cookingTime: 30,
      servingSize: 2,
      rating: 5,
      vegetarian: true,
      isPublic: true,
      image: "https://example.com/image.jpg",
    });

    await recipe.save();

    const savedRecipe = await RecipeModel.findOne({ title: "Test Recipe" });
    expect(savedRecipe).toBeDefined();
    expect(savedRecipe.title).toBe("Test Recipe");
  });
});
