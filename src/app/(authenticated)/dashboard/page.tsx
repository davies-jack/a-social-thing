import { getTimeline, isLiked, likePost } from "@/utils/timeline";
import { headers } from "next/headers";
import { createPost } from "../../actions/post";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import CreatePostForm from "@/components/timeline/CreatePostForm";
import TimelinePost from "@/components/molecules/TimelinePost";
import { SinglePost } from "@/types/Post";
import { getComments } from "@/utils/posts";

export default async function DashboardPage() {
  const headersList = await headers();
  const userId = headersList.get("x-user-id") as string;

  if (!userId) {
    redirect("/login");
  }

  const timeline = await getTimeline(userId);
  const prefetchedPosts = await Promise.all(
    timeline.map(async (post) => ({
      ...post,
      hasLiked: await isLiked(post.id, userId),
      commentAmount: (await getComments(post.id)).length,
    }))
  );

  const postStatus = async (formData: FormData) => {
    "use server";
    let status = formData.get("status") as string;
    status = status.trim();

    if (status.length > 175) {
      return;
    }

    await createPost({ userId, status });
    revalidatePath("/dashboard");
  };

  return (
    <section>
      <div className="w-2/3 mx-auto my-6">
        <CreatePostForm onSubmit={postStatus} />
      </div>
      <section className="flex flex-col items-center">
        <ul className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 items-start gap-6">
          {timeline.length === 0 && <li>no posts yet</li>}
          {prefetchedPosts.map((post: SinglePost) => {
            const toggleLikePost = async () => {
              "use server";
              await likePost(post.id, userId);
              revalidatePath("/dashboard");
            };

            return <TimelinePost key={post.id} post={post} toggleLikePost={toggleLikePost} />;
          })}
        </ul>
      </section>
    </section>
  );
}
