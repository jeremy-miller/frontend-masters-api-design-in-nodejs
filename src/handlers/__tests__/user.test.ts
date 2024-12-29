import * as user from "../user";

describe("user handler", () => {
  it("should create new user", async () => {
    const req = {
      body: {
        username: "test",
        password: "password123",
      },
    };
    const res = {
      json({ token }) {
        expect(token).toBeTruthy();
      },
    };
    const next = () => {};
    await user.createNewUser(req, res, next);
  });
});
