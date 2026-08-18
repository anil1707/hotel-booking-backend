import request from "supertest";
import app from "./app.js";


describe("GET /api/v1/health", () => {
  test("should return server health status", async () => {
    const response = await request(app)
      .get("/api/v1/health");

    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual({
      success: true,
      message: "Server is healthy"
    });
  });
});