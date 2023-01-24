import request from "supertest";
import app from "../../app";
import { RecipeModel } from "../../models/recipe";

describe("GET /public/search-title", () => {
  let testRecipe;
  beforeEach(async () => {
    testRecipe = new RecipeModel({
      title: "Test Recipe",
      ingredients: ["ingredient1", "ingredient2"],
      instructions: ["instruction1", "instruction2"],
      category: "Dinner",
      user: "5f5a8a2d2c5d1b1a7f9a8a7d",
      cookingTime: 30,
      servingSize: 4,
      rating: 5,
      vegetarian: true,
      isPublic: true,
    });
    await testRecipe.save();
  });

  it("should return a recipe matching the title", async () => {
    const res = await request(app)
      .get("/public/search-title")
      .query({ title: JSON.stringify(["Test Recipe"]) })
      .expect(200);
    expect(res.body).toBeDefined();
    expect(res.body.recipes).toBeInstanceOf(Array);
    expect(res.body.recipes[0].title).toEqual("Test Recipe");
    expect(res.body.recipes[0].isPublic).toEqual(true);
  });

  afterEach(async () => {
    await RecipeModel.deleteOne({ _id: testRecipe._id });
  });
});
