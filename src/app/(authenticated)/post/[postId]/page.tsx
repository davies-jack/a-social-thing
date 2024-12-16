import Container from "@/components/atoms/Container";
import CreateCommentForm from "@/components/post/CreateCommentForm";
import LikesButton from "@/components/timeline/LikesButton";
import { formatDate } from "@/utils/date";
import { createComment, getComments, getPost } from "@/utils/posts";
import { likePost } from "@/utils/timeline";
import { Comment } from "@/types/Comment";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: Promise<{
    postId: string;
  }>;
};

export default async function SinglePostPage({ params }: Props) {
  const { postId } = await params;

  const post = await getPost(postId);
  if (!post) {
    redirect("/dashboard");
  }

  const comments = await getComments(postId);

  const handleCreateComment = async (comment: string) => {
    "use server";
    await createComment(postId, post.userId, comment);
    revalidatePath(`/post/${postId}`);
  };

  return (
    <section>
      <Container>
        <p className="text-headline-text">{post.status}</p>
        <span className="text-paragraph-text text-xs">
          created by @{post.user.username} on {formatDate(post.createdAt)}
        </span>

        <LikesButton
          likeAmount={post.likes.length}
          toggleLikePost={async () => {
            "use server";
            await likePost(post.id, post.userId);
            revalidatePath(`/post/${post.id}`);
          }}
          hasLiked={post.likes.some((like) => like.userId === post.userId)}
          className="w-fit mt-2"
        />
      </Container>

      <ul className="mt-12 w-3/4 mx-auto">
        {comments.map((comment: Comment, index: number) => {
          const isFirst = index === 0;
          return (
            <li key={comment.id} className={`${isFirst ? "mt-0" : "mt-4"}`}>
              <Container>
                <p className="text-xs text-headline-text tracking-normal leading-tight break-all whitespace-pre-wrap max-w-full overflow-wrap-anywhere">
                  {comment.comment}
                </p>
                <span className="mt-4 text-paragraph-text text-xs">
                  by @{comment.user.username} {formatDate(comment.createdAt)}
                </span>
              </Container>
            </li>
          );
        })}
      </ul>

      <CreateCommentForm handleCreateComment={handleCreateComment} />
    </section>
  );
}
