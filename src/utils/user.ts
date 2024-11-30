import prisma from "@/utils/db";

export const userIdFromUsername = async (username: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { username }
        })
        return user?.id;
    } catch (error) {
        console.error(error);
        return null;
    }
}
export const usernameFromUserId = async (userId: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        })
        return user?.username;
    } catch (error) {
        console.error(error);
        return null;
    }
}
export const getFollowerAmount = async (userId: string) => {
    const followerAmount = await prisma.relationships.count({
        where: { followingId: userId }
    })
    return followerAmount;
}
export const getFollowersFromUserId = async (userId: string) => {
    const followers = await prisma.relationships.findMany({
        where: { followingId: userId }
    })
    return followers;
}
export const getFollowingAmount = async (userId: string) => {
    const followingAmount = await prisma.relationships.count({
        where: { followerId: userId }
    })
    return followingAmount;
}
export const getFollowingFromUserId = async (userId: string) => {
    const following = await prisma.relationships.findMany({
        where: { followerId: userId }
    })
    return following;
}
export const postAmountFromUserId = async (userId: string) => {
    const postAmount = await prisma.posts.count({
        where: { userId }
    })
    return postAmount;
}
export const totalAmountOfLikesFromAllPosts = async (userId: string) => {
    const allPosts = await prisma.posts.findMany({
        where: { userId },
        select: {
            _count: {
                select: { likes: true }
            }
        }
    });
    const totalAmountOfLikes = allPosts.reduce((acc, post) => acc + post._count.likes, 0);
    return totalAmountOfLikes;
}