import request from "supertest";
import { UserModel } from "../../models/user";

describe("UserModel", () => {
  it("should save a user", async () => {
    const user = new UserModel({
      email: "test@example.com",
      password: "password123",
      username: "testuser",
    });

    await user.save();

    const savedUser = await UserModel.findOne({ email: "test@example.com" });
    expect(savedUser).toBeDefined();
    expect(savedUser.email).toBe("test@example.com");
  });
});
