import request from "supertest";
import app from "../../app";

describe("GET /", () => {
  it("should return all public recipes", async () => {
    const res = await request(app).get("/public/all").expect(200);

    expect(res.body).toHaveProperty("recipes");
    expect(res.body.recipes).toBeInstanceOf(Array);

    // check if all the returned recipes are public
  });
});
