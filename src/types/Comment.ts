export type Comment = {
    id: string;
    userId: string;
    postId: string;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
    user: {
        username: string;
    };
}
