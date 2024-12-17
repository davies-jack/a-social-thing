export interface Post {
  id: string;
  status: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SinglePost extends Post {
  hasLiked: boolean;
  user: {
    username: string;
  };
  likes: {
    userId: string;
  }[];
  commentAmount: number;
}
