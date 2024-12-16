import prisma from "@/utils/db";

export const createPost = async (userId: string, status: string) => {
  const post = await prisma.posts.create({
    data: { userId, status },
  });

  return post;
};
