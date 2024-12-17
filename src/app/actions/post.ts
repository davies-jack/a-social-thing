import { Post } from "@/types/Post";
import prisma from "@/utils/db";

interface CreatePostInput {
  userId: string;
  status: string;
}
interface CreatePostOutput {
  data?: Post;
  message?: string;
  error?: string;
}

export const createPost = async ({
  userId,
  status,
}: CreatePostInput): Promise<CreatePostOutput> => {
  try {
    if (!userId || !status) {
      return { error: "Invalid input" };
    }

    const post = await prisma.posts.create({
      data: { userId, status },
    });

    return { data: post, message: "Post created successfully" };
  } catch (error) {
    console.error("Failed to create post", error);
    return { error: "Failed to create post" };
  }
};
