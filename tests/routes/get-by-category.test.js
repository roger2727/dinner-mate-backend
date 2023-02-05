import request from "supertest";
import app from "../../app";
import { RecipeModel } from "../../models/recipe";

describe("GET /public/category/:category", () => {
  let category;
  beforeEach(async () => {
    category = "Dinner";
    await RecipeModel.create({
      title: "Test Recipe",
      ingredients: ["ingredient1", "ingredient2"],
      instructions: ["instruction1", "instruction2"],
      category: category,
      user: "5f5a8a2d2c5d1b1a7f9a8a7d",
      cookingTime: 30,
      servingSize: 4,
      rating: 5,
      // vegetarian: true,
      // isPublic: true,
    });
  });
  it("should return all public recipes of the specified category", async () => {
    const res = await request(app)
      .get(`/public/category/${category}`)
      .expect(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body[0].category).toEqual(category);
  });
});
