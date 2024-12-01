import prisma from '@/utils/db';
import { AppErrors } from "@/lib/errors";
import { Prisma } from "@prisma/client";

type PostWithLikes = Prisma.PostsGetPayload<{
    include: {
        user: {
            select: {
                username: true
            }
        };
        likes: {
            select: {
                userId: true
            }
        }
    }
}>

export const getLikeAmount = async (postId: string): Promise<number> => {
    try {
        if (!postId) {
            throw AppErrors.BAD_REQUEST("Post ID is required");
        }

        const likeAmount = await prisma.likes.count({
            where: { postId }
        });
        return likeAmount;
    } catch (error) {
        if (error && typeof error === 'object' && 'code' in error) {
            throw error;
        }
        throw AppErrors.INTERNAL("Internal server error");
    }
}

export const isLiked = async (postId: string, userId: string): Promise<boolean> => {
    try {
        if (!postId || !userId) {
            throw AppErrors.BAD_REQUEST("Post ID and User ID are required");
        }

        const existingLike = await prisma.likes.findFirst({
            where: { postId, userId }
        });
        return Boolean(existingLike);
    } catch (error) {
        if (error && typeof error === 'object' && 'code' in error) {
            throw error;
        }
        throw AppErrors.INTERNAL("Internal server error");
    }
}

export const likePost = async (postId: string, userId: string) => {
    try {
        if (!postId || !userId) {
            throw AppErrors.BAD_REQUEST("Post ID and User ID are required");
        }

        const existingLike = await prisma.likes.findFirst({
            where: { postId, userId }
        });

        const likeAmount = await prisma.likes.count({
            where: { postId }
        });

        if (existingLike) {
            const deleteLike = await prisma.likes.delete({
                where: { id: existingLike.id }
            });
            return { like: deleteLike, likeAmount: likeAmount - 1 };
        }

        const like = await prisma.likes.create({
            data: { postId, userId }
        });
        return { like, likeAmount: likeAmount + 1 };
    } catch (error) {
        if (error && typeof error === 'object' && 'code' in error) {
            throw error;
        }
        throw AppErrors.INTERNAL("Failed to like post");
    }
}

export const getTimeline = async (userId: string): Promise<PostWithLikes[]> => {
    try {
        if (!userId) {
            throw AppErrors.BAD_REQUEST("User ID is required");
        }

        const [ourPosts, following] = await Promise.all([
            prisma.posts.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' },
                include: {
                    user: {
                        select: { username: true }
                    },
                    likes: {
                        select: { userId: true }
                    }
                }
            }),
            prisma.relationships.findMany({
                where: { followerId: userId }
            })
        ]);

        const followingIds = following.map(f => f.followingId);

        const followingPosts = await prisma.posts.findMany({
            where: {
                userId: { in: followingIds }
            },
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: { username: true }
                },
                likes: {
                    select: { userId: true }
                }
            }
        });

        const timeline = [...ourPosts, ...followingPosts];
        timeline.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        return timeline;
    } catch (error) {
        if (error && typeof error === 'object' && 'code' in error) {
            throw error;
        }
        throw AppErrors.INTERNAL("Failed to fetch timeline");
    }
};