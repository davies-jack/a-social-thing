import Container from "@/components/Container";
import CreateCommentForm from "@/components/post/CreateCommentForm";
import LikesButton from "@/components/timeline/LikesButton";
import { SinglePost } from "@/types/Post";
import { formatDate } from "@/utils/date";
import { getPost } from "@/utils/posts";
import { likePost } from "@/utils/timeline";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    postId: string;
  };
};

export default async function SinglePostPage({ params }: Props) {
  const { postId } = params;

  const post = await getPost(postId);
  if (!post) {
    redirect("/dashboard");
  }

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

      <h2 className="text-headline-text text-lg font-bold mt-4">comments</h2>
      <ul className="mt-4 w-3/4 mx-auto">
        <li>
          <Container>
            <p className="text-xs text-headline-text tracking-normal leading-tight break-all whitespace-pre-wrap max-w-full overflow-wrap-anywhere">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Quibusdam expedita rem accusamus ratione aliquam repellat
              perspiciatis earum quaerat illum dolorem deserunt asperiores, sed
              omnis rerum consequuntur voluptatum vero voluptates est.
            </p>
            <span className="mt-4 text-paragraph-text text-xs">
              by @jack 14 hours ago
            </span>
          </Container>
        </li>
      </ul>

      <CreateCommentForm />
    </section>
  );
}
