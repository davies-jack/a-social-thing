import { 
    userIdFromUsername,
    usernameFromUserId,
    getFollowerAmount,
    getFollowersFromUserId,
    getFollowingAmount,
    getFollowingFromUserId,
    postAmountFromUserId,
    totalAmountOfLikesFromAllPosts
} from './user';
import prisma from '@/utils/db';

jest.mock('@/utils/db', () => ({
    __esModule: true,
    default: {
        user: {
            findUnique: jest.fn(),
        },
        relationships: {
            count: jest.fn(),
            findMany: jest.fn(),
        },
        posts: {
            count: jest.fn(),
            findMany: jest.fn(),
        }
    }
}));

const mockPrisma = prisma as jest.Mocked<typeof prisma>;

describe('user utils', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('userIdFromUsername', () => {
        it('should throw error if username is not provided', async () => {
            await expect(userIdFromUsername('')).rejects.toMatchObject({
                statusCode: 400,
                code: 'BAD_REQUEST',
                message: 'Username is required'
            });
        });

        it('should return user id for valid username', async () => {
            const mockUser = { id: '123', username: 'testuser' };
            (mockPrisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockUser);
            const result = await userIdFromUsername('testuser');
            expect(result).toBe('123');
        });

        it('should return null for non-existent username', async () => {
            (mockPrisma.user.findUnique as jest.Mock).mockResolvedValueOnce(null);
            const result = await userIdFromUsername('nonexistent');
            expect(result).toBeNull();
        });

        it('should handle database errors', async () => {
            (mockPrisma.user.findUnique as jest.Mock).mockRejectedValueOnce(new Error('Database error'));
            await expect(userIdFromUsername('testuser')).rejects.toMatchObject({
                statusCode: 500,
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Internal server error'
            });
        });
    });

    describe('getFollowerAmount', () => {
        it('should throw error if userId is not provided', async () => {
            await expect(getFollowerAmount('')).rejects.toMatchObject({
                statusCode: 400,
                code: 'BAD_REQUEST',
                message: 'User ID is required'
            });
        });

        it('should return follower count for valid userId', async () => {
            (mockPrisma.relationships.count as jest.Mock).mockResolvedValueOnce(5);
            const result = await getFollowerAmount('123');
            expect(result).toBe(5);
        });

        it('should handle database errors', async () => {
            (mockPrisma.relationships.count as jest.Mock).mockRejectedValueOnce(new Error('Database error'));
            await expect(getFollowerAmount('123')).rejects.toMatchObject({
                statusCode: 500,
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Failed to get follower count'
            });
        });
    });

    describe('totalAmountOfLikesFromAllPosts', () => {
        it('should throw error if userId is not provided', async () => {
            await expect(totalAmountOfLikesFromAllPosts('')).rejects.toMatchObject({
                statusCode: 400,
                code: 'BAD_REQUEST',
                message: 'User ID is required'
            });
        });

        it('should return total likes count for all user posts', async () => {
            const mockPosts = [
                { _count: { likes: 3 } },
                { _count: { likes: 2 } },
                { _count: { likes: 1 } }
            ];
            (mockPrisma.posts.findMany as jest.Mock).mockResolvedValueOnce(mockPosts);
            const result = await totalAmountOfLikesFromAllPosts('123');
            expect(result).toBe(6);
        });

        it('should return 0 when user has no posts', async () => {
            (mockPrisma.posts.findMany as jest.Mock).mockResolvedValueOnce([]);
            const result = await totalAmountOfLikesFromAllPosts('123');
            expect(result).toBe(0);
        });

        it('should handle database errors', async () => {
            (mockPrisma.posts.findMany as jest.Mock).mockRejectedValueOnce(new Error('Database error'));
            await expect(totalAmountOfLikesFromAllPosts('123')).rejects.toMatchObject({
                statusCode: 500,
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Failed to get total likes count'
            });
        });
    });

    describe('usernameFromUserId', () => {
        it('should throw error if userId is not provided', async () => {
            await expect(usernameFromUserId('')).rejects.toMatchObject({
                statusCode: 400,
                code: 'BAD_REQUEST',
                message: 'User ID is required'
            });
        });

        it('should return username for valid userId', async () => {
            const mockUser = { id: '123', username: 'testuser' };
            (mockPrisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockUser);
            const result = await usernameFromUserId('123');
            expect(result).toBe('testuser');
        });

        it('should return null for non-existent userId', async () => {
            (mockPrisma.user.findUnique as jest.Mock).mockResolvedValueOnce(null);
            const result = await usernameFromUserId('nonexistent');
            expect(result).toBeNull();
        });

        it('should handle database errors', async () => {
            (mockPrisma.user.findUnique as jest.Mock).mockRejectedValueOnce(new Error('Database error'));
            await expect(usernameFromUserId('123')).rejects.toMatchObject({
                statusCode: 500,
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Internal server error'
            });
        });
    });

    describe('getFollowersFromUserId', () => {
        it('should throw error if userId is not provided', async () => {
            await expect(getFollowersFromUserId('')).rejects.toMatchObject({
                statusCode: 400,
                code: 'BAD_REQUEST',
                message: 'User ID is required'
            });
        });

        it('should return followers for valid userId', async () => {
            const mockFollowers = [
                { followerId: 'user1' },
                { followerId: 'user2' }
            ];
            (mockPrisma.relationships.findMany as jest.Mock).mockResolvedValueOnce(mockFollowers);
            const result = await getFollowersFromUserId('123');
            expect(result).toEqual([
                {
                    followerId: 'user1'
                },
                {
                    followerId: 'user2'
                }
            ]);
        });

        it('should return empty array when user has no followers', async () => {
            (mockPrisma.relationships.findMany as jest.Mock).mockResolvedValueOnce([]);
            const result = await getFollowersFromUserId('123');
            expect(result).toEqual([]);
        });

        it('should handle database errors', async () => {
            (mockPrisma.relationships.findMany as jest.Mock).mockRejectedValueOnce(new Error('Database error'));
            await expect(getFollowersFromUserId('123')).rejects.toMatchObject({
                statusCode: 500,
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Failed to get followers'
            });
        });
    });

    describe('getFollowingAmount', () => {
        it('should throw error if userId is not provided', async () => {
            await expect(getFollowingAmount('')).rejects.toMatchObject({
                statusCode: 400,
                code: 'BAD_REQUEST',
                message: 'User ID is required'
            });
        });

        it('should return following count for valid userId', async () => {
            (mockPrisma.relationships.count as jest.Mock).mockResolvedValueOnce(3);
            const result = await getFollowingAmount('123');
            expect(result).toBe(3);
        });

        it('should handle database errors', async () => {
            (mockPrisma.relationships.count as jest.Mock).mockRejectedValueOnce(new Error('Database error'));
            await expect(getFollowingAmount('123')).rejects.toMatchObject({
                statusCode: 500,
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Failed to get following count'
            });
        });
    });

    describe('getFollowingFromUserId', () => {
        it('should throw error if userId is not provided', async () => {
            await expect(getFollowingFromUserId('')).rejects.toMatchObject({
                statusCode: 400,
                code: 'BAD_REQUEST',
                message: 'User ID is required'
            });
        });

        it('should return following users for valid userId', async () => {
            const mockFollowing = [
                { followingId: 'user1' },
                { followingId: 'user2' }
            ];
            (mockPrisma.relationships.findMany as jest.Mock).mockResolvedValueOnce(mockFollowing);
            const result = await getFollowingFromUserId('123');
            expect(result).toEqual([
                {
                    followingId: 'user1'
                },
                {
                    followingId: 'user2'
                }
            ]);
        });

        it('should return empty array when user is not following anyone', async () => {
            (mockPrisma.relationships.findMany as jest.Mock).mockResolvedValueOnce([]);
            const result = await getFollowingFromUserId('123');
            expect(result).toEqual([]);
        });

        it('should handle database errors', async () => {
            (mockPrisma.relationships.findMany as jest.Mock).mockRejectedValueOnce(new Error('Database error'));
            await expect(getFollowingFromUserId('123')).rejects.toMatchObject({
                statusCode: 500,
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Failed to get following'
            });
        });
    });

    describe('postAmountFromUserId', () => {
        it('should throw error if userId is not provided', async () => {
            await expect(postAmountFromUserId('')).rejects.toMatchObject({
                statusCode: 400,
                code: 'BAD_REQUEST',
                message: 'User ID is required'
            });
        });

        it('should return post count for valid userId', async () => {
            (mockPrisma.posts.count as jest.Mock).mockResolvedValueOnce(10);
            const result = await postAmountFromUserId('123');
            expect(result).toBe(10);
        });

        it('should handle database errors', async () => {
            (mockPrisma.posts.count as jest.Mock).mockRejectedValueOnce(new Error('Database error'));
            await expect(postAmountFromUserId('123')).rejects.toMatchObject({
                statusCode: 500,
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Failed to get post count'
            });
        });
    });
});