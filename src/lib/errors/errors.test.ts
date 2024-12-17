import { AppErrors } from "./index";

describe("AppErrors", () => {
  describe("BAD_REQUEST", () => {
    it("creates error with correct properties", () => {
      const error = AppErrors.BAD_REQUEST("Invalid input");
      expect(error.message).toBe("Invalid input");
      expect(error.statusCode).toBe(400);
      expect(error.code).toBe("BAD_REQUEST");
    });

    it("includes optional data", () => {
      const data = { field: "username" };
      const error = AppErrors.BAD_REQUEST("Invalid input", data);
      expect(error.data).toEqual(data);
    });
  });

  describe("UNAUTHORIZED", () => {
    it("creates error with correct properties", () => {
      const error = AppErrors.UNAUTHORIZED();
      expect(error.message).toBe("Unauthorized");
      expect(error.statusCode).toBe(401);
      expect(error.code).toBe("UNAUTHORIZED");
    });

    it("accepts custom message", () => {
      const error = AppErrors.UNAUTHORIZED("Custom unauthorized message");
      expect(error.message).toBe("Custom unauthorized message");
    });
  });

  describe("NOT_FOUND", () => {
    it("creates error with correct properties", () => {
      const error = AppErrors.NOT_FOUND();
      expect(error.message).toBe("Resource not found");
      expect(error.statusCode).toBe(404);
      expect(error.code).toBe("NOT_FOUND");
    });

    it("accepts custom message", () => {
      const error = AppErrors.NOT_FOUND("Custom not found message");
      expect(error.message).toBe("Custom not found message");
    });
  });

  describe("INTERNAL", () => {
    it("creates error with correct properties", () => {
      const error = AppErrors.INTERNAL();
      expect(error.message).toBe("Internal server error");
      expect(error.statusCode).toBe(500);
      expect(error.code).toBe("INTERNAL_SERVER_ERROR");
    });

    it("accepts custom message", () => {
      const error = AppErrors.INTERNAL("Custom internal error message");
      expect(error.message).toBe("Custom internal error message");
    });
  });
});
