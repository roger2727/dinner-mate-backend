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
      email: "testing@example.com",
      password,
      username: "testinguser",
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
      .send({ email: "testing@example.com", password: "password" })
      .expect(200);

    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("msg", "You have successfully logged in");
  });
});
