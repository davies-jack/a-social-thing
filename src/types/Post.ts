import { Posts } from "@prisma/client";

export type SinglePost = Posts & {
  hasLiked: boolean;
  user: {
    username: string;
  };
  likes: {
    userId: string;
  }[];
};

