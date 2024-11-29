import { getTimeline, isLiked, likePost } from "@/utils/timeline";
import { headers } from "next/headers";
import { createPost } from "../actions/post";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import CreatePostForm from "@/components/timeline/CreatePostForm";
import TimelinePost from "@/components/timeline/TimelinePost";
import { SinglePost } from "@/types/Post";

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
    }))
  )

  const postStatus = async (formData: FormData) => {
    "use server";
    const status = formData.get("status") as string;
    if (status.length > 175) {
      return;
    }
    
    await createPost(userId, status);
    revalidatePath("/dashboard");
  };

  return (
    <main className="grid md:grid-cols-dashboard grid-cols-1 gap-4 items-start">
      <section className="bg-bg-secondary rounded-md p-4">
        <h1>welcome back</h1>
      </section>

      <section>
        <CreatePostForm onSubmit={postStatus} />
        <section>
          <h2 className="text-headline-text text-lg font-bold">your timeline</h2>
          <ul className="mt-4 pr-4">
            {timeline.length === 0 && <li>no posts yet</li>}
            {prefetchedPosts.map((post: SinglePost) => {
              const toggleLikePost = async () => {
                "use server";
                await likePost(post.id, userId);
                revalidatePath("/dashboard");
              };

              return (
                <TimelinePost
                  key={post.id}
                  post={post}
                  hasLiked={post.hasLiked}
                  toggleLikePost={toggleLikePost}
                />
              );
            })}
          </ul>
        </section>
      </section>
    </main>
  );
}
