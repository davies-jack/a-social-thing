import { createPost } from "./post";
import prisma from "@/utils/db";

jest.mock("@/utils/db", () => ({
  __esModule: true,
  default: {
    posts: {
      create: jest.fn(),
    },
  },
}));

describe("createPost", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a post successfully", async () => {
    const mockPost = {
      id: "123",
      userId: "user123",
      status: "Test post",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    (prisma.posts.create as jest.Mock).mockResolvedValue(mockPost);

    const result = await createPost({
      userId: "user123",
      status: "Test post",
    });

    expect(prisma.posts.create).toHaveBeenCalledWith({
      data: {
        userId: "user123",
        status: "Test post",
      },
    });

    expect(result).toEqual({
      data: mockPost,
      message: "Post created successfully",
    });
  });

  it("should return error for missing userId", async () => {
    const result = await createPost({
      userId: "",
      status: "Test post",
    });

    expect(prisma.posts.create).not.toHaveBeenCalled();
    expect(result).toEqual({
      error: "Invalid input",
    });
  });

  it("should return error for missing status", async () => {
    const result = await createPost({
      userId: "user123",
      status: "",
    });

    expect(prisma.posts.create).not.toHaveBeenCalled();
    expect(result).toEqual({
      error: "Invalid input",
    });
  });

  it("should handle database errors", async () => {
    (prisma.posts.create as jest.Mock).mockRejectedValue(new Error("DB Error"));

    const result = await createPost({
      userId: "user123",
      status: "Test post",
    });

    expect(prisma.posts.create).toHaveBeenCalled();
    expect(result).toEqual({
      error: "Failed to create post",
    });
  });
});
