import prisma from "./db";

export const getPosts = async (userId: string) => {
    const posts = await prisma.posts.findMany({
        where: { userId }
    });

    return posts;
};
export const getPost = async (postId: string) => {
    try {
        const post = await prisma.posts.findUnique({
            where: { id: postId },
            include: {
                user: {
                    select: {
                        username: true
                    }
                }
            }
        });
    
        return post;
    } catch (error) {
        console.error(error);
        return null;
    }
};