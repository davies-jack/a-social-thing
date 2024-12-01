import { getPosts, getPost } from "../utils/posts";
import prisma from '@/utils/db';

jest.mock('@/utils/db', () => ({
    __esModule: true,
    default: {
        posts: {
            findMany: jest.fn(),
            findUnique: jest.fn(),
        }
    }
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
                message: "User ID is required"
            });
        });

        it("throws internal error for unexpected errors", async () => {
            (mockPrisma.posts.findMany as jest.Mock).mockRejectedValueOnce(new Error("DB error"));
            await expect(getPosts("user1")).rejects.toMatchObject({
                statusCode: 500,
                code: "INTERNAL_SERVER_ERROR",
                message: "Internal server error"
            });
        });

        it("returns posts for valid userId", async () => {
            const mockPosts = [{ id: "1", status: "Test post", createdAt: new Date(), userId: "user1", user: { username: "testuser" }, likes: [] }];
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
                message: "Post ID is required"
            });
        });

        it("throws not found error if post doesn't exist", async () => {
            (mockPrisma.posts.findUnique as jest.Mock).mockResolvedValueOnce(null);
            await expect(getPost("1")).rejects.toMatchObject({
                statusCode: 404,
                code: "NOT_FOUND",
                message: "Post not found"
            });
        });

        it("throws internal error for unexpected errors", async () => {
            (mockPrisma.posts.findUnique as jest.Mock).mockRejectedValueOnce(new Error("DB error"));
            await expect(getPost("1")).rejects.toMatchObject({
                statusCode: 500,
                code: "INTERNAL_SERVER_ERROR",
                message: "Internal server error"
            });
        });

        it("returns post for valid postId", async () => {
            const mockPost = { id: "1", status: "Test post", createdAt: new Date(), userId: "user1", user: { username: "testuser" }, likes: [] };
            (mockPrisma.posts.findUnique as jest.Mock).mockResolvedValueOnce(mockPost);
            const result = await getPost("1");
            expect(result).toEqual(mockPost);
        });
    });
});
