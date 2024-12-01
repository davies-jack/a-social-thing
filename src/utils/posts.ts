import { AppErrors } from "@/lib/errors";
import prisma from "./db";
import { Prisma } from "@prisma/client";
import { Comment } from "@/types/Comment";
type PostWithUser = Prisma.PostsGetPayload<{
    include: {
        user: {
            select: {
                username: true
            }
        };
        likes: true;
        comments: true;
    }
}>

export const getPosts = async (userId: string) : Promise<PostWithUser[]> => {
    try {
        if (!userId) {
            throw AppErrors.BAD_REQUEST("User ID is required");
        }
        
        const posts = await prisma.posts.findMany({
            where: { userId },
            orderBy: {
                createdAt: "desc",
            },
            include: {
                user: {
                    select: {
                        username: true
                    }
                },
                likes: true,
            }
        });
    
        return posts;
    } catch (error) {
        if (error && typeof error === 'object' && 'code' in error) {
            throw error;
        }
        throw AppErrors.INTERNAL("Internal server error");
    }
};

export const getPost = async (postId: string) : Promise<PostWithUser> => {
    if (!postId) {
        throw AppErrors.BAD_REQUEST("Post ID is required");
    }
    try {
        const post = await prisma.posts.findUnique({
            where: { id: postId },
            include: {
                user: {
                    select: {
                        username: true
                    }
                },
                likes: true,
            }
        });
        if (!post) {
            throw AppErrors.NOT_FOUND("Post not found");
        }
    
        return post;
    } catch (error) {
        if (error && typeof error === 'object' && 'code' in error) {
            throw error;
        }
        throw AppErrors.INTERNAL("Internal server error");
    }
};

export const getComments = async (postId: string) : Promise<Comment[]> => {
    if (!postId) {
        throw AppErrors.BAD_REQUEST("Post ID is required");
    }

    try {
        const comments = await prisma.comments.findMany({
            where: { postId },
            include: {
                user: {
                    select: {
                        username: true
                    }
                }
            }
        });
        return comments;
    } catch (error) {
        if (error && typeof error === 'object' && 'code' in error) {
            throw error;
        }
        throw AppErrors.INTERNAL("Internal server error");
    }
};

export const createComment = async (postId: string, userId: string, comment: string) : Promise<Comment> => {
    if (!postId || !userId || !comment) {
        throw AppErrors.BAD_REQUEST("Post ID, User ID, and Comment are required");
    }

    try {
        const newComment = await prisma.comments.create({
            data: { postId, userId, comment },
            include: {
                user: {
                    select: {
                        username: true
                    }
                }
            }
        });

        return newComment;
    } catch (error) {
        if (error && typeof error === 'object' && 'code' in error) {
            throw error;
        }
        throw AppErrors.INTERNAL("Internal server error");
    }
}