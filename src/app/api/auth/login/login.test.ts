/**
 * @jest-environment node
 */
import prisma from "@/utils/db";
import { POST } from "./route";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";

jest.mock("bcrypt");
jest.mock("@/utils/db", () => ({
  __esModule: true,
  default: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));

const mockPrisma = prisma as jest.Mocked<typeof prisma>;

async function createPostRequest(
  url: string,
  body: Record<string, unknown>,
  headers?: Record<string, string>
): Promise<NextRequest> {
  return new NextRequest(new Request(url, { method: "POST", body: JSON.stringify(body), headers }));
}

const EMPTY_BODY = {};
const NORMAL_BODY = {
  email: "test@test.com",
  password: "password",
};
const HEADERS = {
  "Content-Type": "application/json",
};

describe("POST /api/auth/login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if missing required fields", async () => {
    const req = await createPostRequest(
      "http://localhost:3000/api/auth/login",
      EMPTY_BODY,
      HEADERS
    );

    const response = await POST(req);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.message).toBe("Email and password are required");
  });
  it("should return 404 if user not found", async () => {
    (mockPrisma.user.findUnique as jest.Mock).mockResolvedValueOnce(null);

    const req = await createPostRequest(
      "http://localhost:3000/api/auth/login",
      NORMAL_BODY,
      HEADERS
    );

    const response = await POST(req);
    const body = await response?.json();

    expect(response?.status).toBe(404);
    expect(body?.message).toBe("User not found");
  });
  it("should return 401 if invalid password", async () => {
    (mockPrisma.user.findUnique as jest.Mock).mockResolvedValueOnce({
      id: "1",
      email: "test@test.com",
      password: "hashedPassword",
      username: "testuser",
    });
    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);

    const req = await createPostRequest(
      "http://localhost:3000/api/auth/login",
      NORMAL_BODY,
      HEADERS
    );

    const response = await POST(req);
    const body = await response?.json();

    expect(response?.status).toBe(401);
    expect(body?.message).toBe("Invalid password");
  });

  it("should return 200 if login is successful", async () => {
    (mockPrisma.user.findUnique as jest.Mock).mockResolvedValueOnce({
      id: "1",
      email: "test@test.com",
      password: "hashedPassword",
      username: "testuser",
    });
    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);

    const req = await createPostRequest(
      "http://localhost:3000/api/auth/login",
      NORMAL_BODY,
      HEADERS
    );

    const response = await POST(req);
    const body = await response?.json();

    expect(response?.status).toBe(200);
    expect(body?.message).toBe("Login successful");
    expect(response?.cookies.get("token")).toBeDefined();
    expect(response?.cookies.get("token")?.value).toBeDefined();
    expect(response?.cookies.get("token")?.value).not.toBe("");
  });

  it("should return 500 if error occurs", async () => {
    (mockPrisma.user.findUnique as jest.Mock).mockRejectedValueOnce(new Error("Database error"));

    const req = await createPostRequest(
      "http://localhost:3000/api/auth/login",
      NORMAL_BODY,
      HEADERS
    );

    const response = await POST(req);
    const body = await response?.json();

    expect(response?.status).toBe(500);
    expect(body?.message).toBe("Internal server error");
  });
});
