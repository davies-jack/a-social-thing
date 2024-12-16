import { Post } from "@/types/Post";
import prisma from "@/utils/db";

interface CreatePostInput {
  userId: string;
  status: string;
}
interface CreatePostOutput {
  success: boolean;
  data?: Post;
  error?: string;
}

export const createPost = async ({
  userId,
  status,
}: CreatePostInput): Promise<CreatePostOutput> => {
  try {
    if (!userId || !status) {
      return { success: false, error: "Invalid input" };
    }

    const post = await prisma.posts.create({
      data: { userId, status },
    });

    return { success: true, data: post };
  } catch (error) {
    console.error("Failed to create post", error);
    return { success: false, error: "Failed to create post" };
  }
};
