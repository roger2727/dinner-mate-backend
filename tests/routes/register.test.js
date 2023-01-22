import request from "supertest";
import app from "../../app"; // import your express app
import { UserModel } from "../../models/user";
beforeEach(async () => {
  // Delete all users from the test database before each test
  await UserModel.deleteMany({});
});
describe("POST /auth/register", () => {
  beforeEach(async () => {
    // Delete all users from the test database before each test
    await UserModel.deleteMany({});
  });

  it("should create a new user and return a 201 status code", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        email: `test${Math.random()}@example.com`,
        password: "password",
        username: "testuser",
      })
      .expect(201);

    expect(res.body).toHaveProperty("user");
    expect(res.body.user).toHaveProperty("email");
    expect(res.body.user).toHaveProperty("username", "testuser");
  });

  it("should return a 400 status code if required fields are missing", async () => {
    await request(app)
      .post("/auth/register")
      .send({ email: "test@example.com", password: "password" })
      .expect(400);

    await request(app)
      .post("/auth/register")
      .send({ email: "test@example.com", username: "testuser" })
      .expect(400);

    await request(app)
      .post("/auth/register")
      .send({ password: "password", username: "testuser" })
      .expect(400);
  });

  it("should return a 400 status code if email is not in correct format", async () => {
    await request(app)
      .post("/auth/register")
      .send({
        email: "testexample.com",
        password: "password",
        username: "testuser",
      })
      .expect(400);
  });

  it("should return a 400 status code if password is not at least 8 characters long", async () => {
    await request(app)
      .post("/auth/register")
      .send({
        email: "test@example.com",
        password: "pass",
        username: "testuser",
      })
      .expect(400);
  });
});
