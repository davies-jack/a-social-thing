import { Posts } from "@prisma/client";

export type SinglePost = Posts & {
  user: {
    username: string;
  };
  likes: {
    userId: string;
  }[];
};

