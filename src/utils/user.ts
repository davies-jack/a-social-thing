import prisma from "@/utils/db";
import { AppErrors } from "@/lib/errors";
import { User } from "@prisma/client";

export const userIdFromUsername = async (username: string): Promise<string | null> => {
  try {
    if (!username) {
      throw AppErrors.BAD_REQUEST("Username is required");
    }

    const user = await prisma.user.findUnique({
      where: { username },
    });
    return user?.id || null;
  } catch (error) {
    if (error && typeof error === "object" && "code" in error) {
      throw error;
    }
    throw AppErrors.INTERNAL("Internal server error");
  }
};

export const usernameFromUserId = async (userId: string): Promise<string | null> => {
  try {
    if (!userId) {
      throw AppErrors.BAD_REQUEST("User ID is required");
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    return user?.username || null;
  } catch (error) {
    if (error && typeof error === "object" && "code" in error) {
      throw error;
    }
    throw AppErrors.INTERNAL("Internal server error");
  }
};

export const getFollowerAmount = async (userId: string): Promise<number> => {
  try {
    if (!userId) {
      throw AppErrors.BAD_REQUEST("User ID is required");
    }

    const followerAmount = await prisma.relationships.count({
      where: { followingId: userId },
    });
    return followerAmount;
  } catch (error) {
    if (error && typeof error === "object" && "code" in error) {
      throw error;
    }
    throw AppErrors.INTERNAL("Failed to get follower count");
  }
};

export const getFollowersFromUserId = async (userId: string) => {
  try {
    if (!userId) {
      throw AppErrors.BAD_REQUEST("User ID is required");
    }

    const followers = await prisma.relationships.findMany({
      where: { followingId: userId },
    });
    return followers;
  } catch (error) {
    if (error && typeof error === "object" && "code" in error) {
      throw error;
    }
    throw AppErrors.INTERNAL("Failed to get followers");
  }
};

export const getFollowingAmount = async (userId: string): Promise<number> => {
  try {
    if (!userId) {
      throw AppErrors.BAD_REQUEST("User ID is required");
    }

    const followingAmount = await prisma.relationships.count({
      where: { followerId: userId },
    });
    return followingAmount;
  } catch (error) {
    if (error && typeof error === "object" && "code" in error) {
      throw error;
    }
    throw AppErrors.INTERNAL("Failed to get following count");
  }
};

export const getFollowingFromUserId = async (userId: string) => {
  try {
    if (!userId) {
      throw AppErrors.BAD_REQUEST("User ID is required");
    }

    const following = await prisma.relationships.findMany({
      where: { followerId: userId },
    });
    return following;
  } catch (error) {
    if (error && typeof error === "object" && "code" in error) {
      throw error;
    }
    throw AppErrors.INTERNAL("Failed to get following");
  }
};

export const postAmountFromUserId = async (userId: string): Promise<number> => {
  try {
    if (!userId) {
      throw AppErrors.BAD_REQUEST("User ID is required");
    }

    const postAmount = await prisma.posts.count({
      where: { userId },
    });
    return postAmount;
  } catch (error) {
    if (error && typeof error === "object" && "code" in error) {
      throw error;
    }
    throw AppErrors.INTERNAL("Failed to get post count");
  }
};

export const totalAmountOfLikesFromAllPosts = async (userId: string): Promise<number> => {
  try {
    if (!userId) {
      throw AppErrors.BAD_REQUEST("User ID is required");
    }

    const allPosts = await prisma.posts.findMany({
      where: { userId },
      select: {
        _count: {
          select: { likes: true },
        },
      },
    });

    const totalAmountOfLikes = allPosts.reduce((acc, post) => acc + post._count.likes, 0);
    return totalAmountOfLikes;
  } catch (error) {
    if (error && typeof error === "object" && "code" in error) {
      throw error;
    }
    throw AppErrors.INTERNAL("Failed to get total likes count");
  }
};
