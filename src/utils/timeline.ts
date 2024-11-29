import prisma from '@/utils/db';

export const getLikeAmount = async (postId: string) => {
    const likeAmount = await prisma.likes.count({
        where: {
            postId: postId
        }
    });
    return likeAmount
}
export const isLiked = async (postId: string, userId: string) => {
    const existingLike = await prisma.likes.findFirst({
        where: {
            postId: postId,
            userId: userId
        }
    });
    return existingLike ? true : false;
}
export const likePost = async (postId: string, userId: string) => {
    try {
        const existingLike = await prisma.likes.findFirst({
            where: {
                postId: postId,
                userId: userId
            }
        });
        const likeAmount = await prisma.likes.count({
            where: {
                postId: postId
            }
        });
        if (existingLike) {
            const deleteLike = await prisma.likes.delete({
                where: {
                    id: existingLike.id
                }
            });
            return { like: deleteLike, likeAmount: likeAmount - 1 }
        }

        const like = await prisma.likes.create({
            data: {
                postId: postId,
                userId: userId
            }
        })
        return { like, likeAmount: likeAmount + 1 }
    } catch (error) {
        console.error(error);
        return { error: 'Failed to like post' }
    }
}
export const getTimeline = async (userId: string) => {
    try {
        const ourPosts = await prisma.posts.findMany({
            where: {
                userId: userId
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                user: {
                    select: {
                        username: true
                    }
                },
                likes: {
                    select: {
                        userId: true
                    }
                }
            }
        });

        const following = await prisma.relationships.findMany({
            where: {
                followerId: userId
            }
        });

        const followingIds = following.map(f => f.followingId);

        const followingPosts = await prisma.posts.findMany({
            where: {
                userId: { in: followingIds }
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                user: {
                    select: {
                        username: true
                    }
                },
                likes: {
                    select: {
                        userId: true
                    }
                }
            }
        });

        return [...ourPosts, ...followingPosts];
    } catch (error) {
        console.error(error);
        return [];
    }
};