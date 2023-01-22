// This test is checking that when a user sends a POST request to the "/auth/login" route with a valid email and password in the request body, the server should return a JSON response with a token and a message indicating a successful login. The test creates a new user with a hashed password in the test database before each test, and then sends a request with the email and plaintext password to the route. The test then asserts that the response has a "token" property and a "msg" property with the value "You have successfully logged in". The test also closes the server connection after all tests are run.

import request from "supertest";
import app from "../../app"; // import your express app
import { UserModel } from "../../models/user";

import bcrypt from "bcrypt";

describe("POST /auth/login", () => {
  let user;
  beforeEach(async () => {
    // Create a new user in the test database
    const password = await bcrypt.hash("password", 12);
    user = new UserModel({
      email: "test@example.com",
      password,
      username: "testuser",
    });
    await user.save();
  });

  afterEach(async () => {
    // Delete the test user from the test database
    await UserModel.deleteMany({});
  });

  it("should return a token and a message on successful login", async () => {
    // Send the email and password in the request body
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "test@example.com", password: "password" })
      .expect(200);

    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("msg", "You have successfully logged in");
  });
});
