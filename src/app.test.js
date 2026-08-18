const request = require("supertest");
const { default: app } = require("./app");


describe("GET /health", () => {
  test("should return server health status", async () => {
    const response = await request(app)
      .get("/health");

    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual({
      success: true,
      message: "Server is healthy"
    });
  });
});