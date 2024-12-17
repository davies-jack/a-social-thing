import { getPosts, getPost, getComments, createComment } from "../utils/posts";
import prisma from "@/utils/db";

jest.mock("@/utils/db", () => ({
  __esModule: true,
  default: {
    posts: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    comments: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
  },
}));

const mockPrisma = prisma as jest.Mocked<typeof prisma>;

describe("posts utils", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getPosts", () => {
    it("throws error if userId is not provided", async () => {
      await expect(getPosts("")).rejects.toMatchObject({
        statusCode: 400,
        code: "BAD_REQUEST",
        message: "User ID is required",
      });
    });

    it("throws internal error for unexpected errors", async () => {
      (mockPrisma.posts.findMany as jest.Mock).mockRejectedValueOnce(new Error("DB error"));
      await expect(getPosts("user1")).rejects.toMatchObject({
        statusCode: 500,
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal server error",
      });
    });

    it("returns posts for valid userId", async () => {
      const mockPosts = [
        {
          id: "1",
          status: "Test post",
          createdAt: new Date(),
          userId: "user1",
          user: { username: "testuser" },
          likes: [],
        },
      ];
      (mockPrisma.posts.findMany as jest.Mock).mockResolvedValueOnce(mockPosts);
      const result = await getPosts("user1");
      expect(result).toEqual(mockPosts);
    });
  });

  describe("getPost", () => {
    it("throws error if postId is not provided", async () => {
      await expect(getPost("")).rejects.toMatchObject({
        statusCode: 400,
        code: "BAD_REQUEST",
        message: "Post ID is required",
      });
    });

    it("throws not found error if post doesn't exist", async () => {
      (mockPrisma.posts.findUnique as jest.Mock).mockResolvedValueOnce(null);
      await expect(getPost("1")).rejects.toMatchObject({
        statusCode: 404,
        code: "NOT_FOUND",
        message: "Post not found",
      });
    });

    it("throws internal error for unexpected errors", async () => {
      (mockPrisma.posts.findUnique as jest.Mock).mockRejectedValueOnce(new Error("DB error"));
      await expect(getPost("1")).rejects.toMatchObject({
        statusCode: 500,
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal server error",
      });
    });

    it("returns post for valid postId", async () => {
      const mockPost = {
        id: "1",
        status: "Test post",
        createdAt: new Date(),
        userId: "user1",
        user: { username: "testuser" },
        likes: [],
      };
      (mockPrisma.posts.findUnique as jest.Mock).mockResolvedValueOnce(mockPost);
      const result = await getPost("1");
      expect(result).toEqual(mockPost);
    });
  });

  describe("getComments", () => {
    it("throws error if postId is not provided", async () => {
      await expect(getComments("")).rejects.toMatchObject({
        statusCode: 400,
        code: "BAD_REQUEST",
        message: "Post ID is required",
      });
    });

    it("returns comments for valid postId", async () => {
      const mockComments = [
        {
          id: "1",
          content: "Test comment",
          createdAt: new Date(),
          postId: "post1",
          user: { username: "testuser" },
        },
      ];
      (mockPrisma.comments.findMany as jest.Mock).mockResolvedValueOnce(mockComments);
      const result = await getComments("post1");
      expect(result).toEqual(mockComments);
    });

    it("throws error if error is an object with code property", async () => {
      const error = { code: "BAD_REQUEST", message: "Invalid input" };
      (mockPrisma.comments.findMany as jest.Mock).mockRejectedValueOnce(error);
      await expect(getComments("post1")).rejects.toMatchObject(error);
    });

    it("throws internal error for unexpected errors", async () => {
      (mockPrisma.comments.findMany as jest.Mock).mockRejectedValueOnce(new Error("DB error"));
      await expect(getComments("post1")).rejects.toMatchObject({
        statusCode: 500,
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal server error",
      });
    });
  });

  describe("createComment", () => {
    it("throws error if postId is not provided", async () => {
      await expect(createComment("", "user1", "comment")).rejects.toMatchObject({
        statusCode: 400,
        code: "BAD_REQUEST",
        message: "Post ID, User ID, and Comment are required",
      });
    });

    it("throws error if userId is not provided", async () => {
      await expect(createComment("post1", "", "comment")).rejects.toMatchObject({
        statusCode: 400,
        code: "BAD_REQUEST",
        message: "Post ID, User ID, and Comment are required",
      });
    });

    it("throws error if comment is not provided", async () => {
      await expect(createComment("post1", "user1", "")).rejects.toMatchObject({
        statusCode: 400,
        code: "BAD_REQUEST",
        message: "Post ID, User ID, and Comment are required",
      });
    });

    it("creates and returns comment for valid inputs", async () => {
      const mockComment = {
        id: "1",
        comment: "Test comment",
        postId: "post1",
        userId: "user1",
        createdAt: new Date(),
        user: { username: "testuser" },
      };
      (mockPrisma.comments.create as jest.Mock).mockResolvedValueOnce(mockComment);
      const result = await createComment("post1", "user1", "Test comment");
      expect(result).toEqual(mockComment);
    });

    it("throws error if error is an object with code property", async () => {
      const error = { code: "BAD_REQUEST", message: "Invalid input" };
      (mockPrisma.comments.create as jest.Mock).mockRejectedValueOnce(error);
      await expect(createComment("post1", "user1", "Test comment")).rejects.toMatchObject(error);
    });

    it("throws internal error for unexpected errors", async () => {
      (mockPrisma.comments.create as jest.Mock).mockRejectedValueOnce(new Error("DB error"));
      await expect(createComment("post1", "user1", "Test comment")).rejects.toMatchObject({
        statusCode: 500,
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal server error",
      });
    });
  });
});
