import { getTimeline, isLiked, likePost, getLikeAmount } from './timeline';
import prisma from '@/utils/db';
import { AppErrors } from '@/lib/errors';

jest.mock('@/utils/db', () => ({
    __esModule: true,
    default: {
        posts: {
            findMany: jest.fn(),
        },
        likes: {
            findFirst: jest.fn(),
            count: jest.fn(),
            create: jest.fn(),
            delete: jest.fn(),
        },
        relationships: {
            findMany: jest.fn(),
        }
    },
}));

const mockPrisma = prisma as jest.Mocked<typeof prisma>;

describe('timeline utils', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getLikeAmount', () => {
        it('should throw error if postId is not provided', async () => {
            await expect(getLikeAmount('')).rejects.toMatchObject({
                statusCode: 400,
                code: 'BAD_REQUEST',
                message: 'Post ID is required'
            });
        });

        it('should return like count for valid postId', async () => {
            (mockPrisma.likes.count as jest.Mock).mockResolvedValueOnce(5);
            const result = await getLikeAmount('123');
            expect(result).toBe(5);
        });

        it('should handle database errors', async () => {
            (mockPrisma.likes.count as jest.Mock).mockRejectedValueOnce(new Error('Database error'));
            await expect(getLikeAmount('123')).rejects.toMatchObject({
                statusCode: 500,
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Internal server error'
            });
        });
    });

    describe('isLiked', () => {
        it('should throw error if postId or userId is not provided', async () => {
            await expect(isLiked('', '123')).rejects.toMatchObject({
                statusCode: 400,
                code: 'BAD_REQUEST',
                message: 'Post ID and User ID are required'
            });
            await expect(isLiked('123', '')).rejects.toMatchObject({
                statusCode: 400,
                code: 'BAD_REQUEST',
                message: 'Post ID and User ID are required'
            });
        });

        it('should return true if the post is liked', async () => {
            (mockPrisma.likes.findFirst as jest.Mock).mockResolvedValueOnce({ id: '1' });
            const result = await isLiked('123', '456');
            expect(result).toBe(true);
        });

        it('should return false if the post is not liked', async () => {
            (mockPrisma.likes.findFirst as jest.Mock).mockResolvedValueOnce(null);
            const result = await isLiked('123', '456');
            expect(result).toBe(false);
        });

        it('should handle database errors', async () => {
            (mockPrisma.likes.findFirst as jest.Mock).mockRejectedValueOnce(new Error('Database error'));
            await expect(isLiked('123', '456')).rejects.toMatchObject({
                statusCode: 500,
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Internal server error'
            });
        });
    });

    describe('likePost', () => {
        it('should throw error if postId or userId is not provided', async () => {
            await expect(likePost('', '123')).rejects.toMatchObject({
                statusCode: 400,
                code: 'BAD_REQUEST',
                message: 'Post ID and User ID are required'
            });
            await expect(likePost('123', '')).rejects.toMatchObject({
                statusCode: 400,
                code: 'BAD_REQUEST',
                message: 'Post ID and User ID are required'
            });
        });

        it('should like a post', async () => {
            const mockLike = { id: '1' };
            (mockPrisma.likes.findFirst as jest.Mock).mockResolvedValueOnce(null);
            (mockPrisma.likes.count as jest.Mock).mockResolvedValueOnce(0);
            (mockPrisma.likes.create as jest.Mock).mockResolvedValueOnce(mockLike);
            
            const result = await likePost('123', '456');
            expect(result).toEqual({ like: mockLike, likeAmount: 1 });
        });

        it('should unlike a post', async () => {
            const mockLike = { id: '1' };
            (mockPrisma.likes.findFirst as jest.Mock).mockResolvedValueOnce(mockLike);
            (mockPrisma.likes.count as jest.Mock).mockResolvedValueOnce(1);
            (mockPrisma.likes.delete as jest.Mock).mockResolvedValueOnce(mockLike);
            
            const result = await likePost('123', '456');
            expect(result).toEqual({ like: mockLike, likeAmount: 0 });
        });

        it('should handle database errors', async () => {
            (mockPrisma.likes.findFirst as jest.Mock).mockRejectedValueOnce(new Error('Database error'));
            await expect(likePost('123', '456')).rejects.toMatchObject({
                statusCode: 500,
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Failed to like post'
            });
        });
    });

    describe('getTimeline', () => {
        it('should throw error if userId is not provided', async () => {
            await expect(getTimeline('')).rejects.toMatchObject({
                statusCode: 400,
                code: 'BAD_REQUEST',
                message: 'User ID is required'
            });
        });

        it('should return combined timeline of user and following posts', async () => {
            const mockUserPosts = [{
                id: '1',
                status: 'Test post 1',
                createdAt: new Date(),
                userId: '123',
                user: { username: 'testuser' },
                likes: []
            }];

            const mockFollowing = [
                { followerId: '123', followingId: '456' }
            ];

            const mockFollowingPosts = [{
                id: '2',
                status: 'Test post 2',
                createdAt: new Date(),
                userId: '456',
                user: { username: 'followeduser' },
                likes: []
            }];

            (mockPrisma.posts.findMany as jest.Mock)
                .mockResolvedValueOnce(mockUserPosts)
                .mockResolvedValueOnce(mockFollowingPosts);
            (mockPrisma.relationships.findMany as jest.Mock).mockResolvedValueOnce(mockFollowing);

            const result = await getTimeline('123');
            expect(result).toEqual([...mockUserPosts, ...mockFollowingPosts]);
        });

        it('should handle database errors', async () => {
            (mockPrisma.posts.findMany as jest.Mock).mockRejectedValueOnce(new Error('Database error'));
            await expect(getTimeline('123')).rejects.toMatchObject({
                statusCode: 500,
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Failed to fetch timeline'
            });
        });
    });
});