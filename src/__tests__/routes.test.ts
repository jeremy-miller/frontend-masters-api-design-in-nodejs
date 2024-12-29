import request from "supertest";
import app from "../server";

describe("GET /", () => {
  it("should send back test message", async () => {
    const res = await request(app).get("");
    expect(res.body.message).toBe("test");
  });
});
