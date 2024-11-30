import { getTimeline, isLiked, likePost } from './timeline';
import prisma from '@/utils/db';

jest.mock('@/utils/db', () => ({
    __esModule: true,
    default: {
        user: {
            findUnique: jest.fn(),
            create: jest.fn(),
        },
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

describe('getTimeline', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return combined timeline of user and following posts', async () => {
    const userId = '123';
    const mockUserPosts = [
      {
        id: '1',
        status: 'Test post 1',
        createdAt: new Date(),
        userId: '123',
        user: { username: 'testuser' },
        likes: []
      }
    ];

    const mockFollowing = [
      { followerId: '123', followingId: '456' }
    ];

    const mockFollowingPosts = [
      {
        id: '2', 
        status: 'Test post 2',
        createdAt: new Date(),
        userId: '456',
        user: { username: 'followeduser' },
        likes: []
      }
    ];

    (mockPrisma.posts.findMany as jest.Mock).mockResolvedValueOnce(mockUserPosts).mockResolvedValueOnce(mockFollowingPosts);
    (mockPrisma.relationships.findMany as jest.Mock).mockResolvedValueOnce(mockFollowing);

    const result = await getTimeline(userId);

    expect(result).toEqual([...mockUserPosts, ...mockFollowingPosts]);
    expect(mockPrisma.posts.findMany).toHaveBeenCalledTimes(2);
    expect(mockPrisma.relationships.findMany).toHaveBeenCalledWith({
      where: { followerId: userId }
    });
  });

  it('should handle errors gracefully', async () => {
    const userId = '123';
    (mockPrisma.posts.findMany as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

    const result = await getTimeline(userId);

    expect(result).toEqual([]);
  });
});

describe('isLiked', () => {
    it('should return true if the post is liked', async () => {
        const postId = '1';
        const userId = '123';
        (mockPrisma.likes.findFirst as jest.Mock).mockResolvedValueOnce({ id: '1' });
        const result = await isLiked(postId, userId);
        expect(result).toBe(true);
    })

    it('should return false if the post is not liked', async () => {
        const postId = '1';
        const userId = '123';
        (mockPrisma.likes.findFirst as jest.Mock).mockResolvedValueOnce(null);
        const result = await isLiked(postId, userId);
        expect(result).toBe(false);
    })
})

describe('likePost', () => {
    it('should like a post', async () => {
        const postId = '1';
        const userId = '123';
        (mockPrisma.likes.findFirst as jest.Mock).mockResolvedValueOnce(null);
        (mockPrisma.likes.count as jest.Mock).mockResolvedValueOnce(0);
        (mockPrisma.likes.create as jest.Mock).mockResolvedValueOnce({ id: '1' });
        const result = await likePost(postId, userId);
        expect(result).toEqual({ like: { id: '1' }, likeAmount: 1 });
    })

    it('should unlike a post', async () => {
        const postId = '1';
        const userId = '123';
        (mockPrisma.likes.findFirst as jest.Mock).mockResolvedValueOnce({ id: '1' });
        (mockPrisma.likes.count as jest.Mock).mockResolvedValueOnce(1);
        (mockPrisma.likes.delete as jest.Mock).mockResolvedValueOnce({ id: '1' });
        const result = await likePost(postId, userId);
        expect(result).toEqual({ like: { id: '1' }, likeAmount: 0 });
    })

    it('should handle errors gracefully', async () => {
        const postId = '1';
        const userId = '123';
        (mockPrisma.likes.findFirst as jest.Mock).mockRejectedValueOnce(new Error('Database error'));
        
        
        const result = await likePost(postId, userId);
        expect(result).toEqual({ error: 'Failed to like post' });
    })
})