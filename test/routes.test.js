import app from "../app.js";
import request from "supertest";

describe("Test route to get all users", () => {
  it("should respond with a status code 200", async () => {
    const response = await request(app).get("/auth");
    expect(response.statusCode).toEqual(200);
  });
});

describe("Test route to api", () => {
  it("should respond with a status code 200", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toEqual(200);
  });
});
