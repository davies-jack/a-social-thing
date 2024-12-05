export type Post = {
  id: string;
  status: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type SinglePost = Post & {
  hasLiked: boolean;
  user: {
    username: string;
  };
  likes: {
    userId: string;
  }[];
  commentAmount: number;
};

