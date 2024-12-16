import Pill from "@/components/atoms/Pill/";
import { formatDate } from "@/utils/date";
import prisma from "@/utils/db";
import { getPosts } from "@/utils/posts";
import { userIdFromUsername } from "@/utils/user";
import { revalidatePath } from "next/dist/server/web/spec-extension/revalidate";
import { headers } from "next/headers";
import React from "react";

type Props = {
  params: Promise<{
    username: string;
  }>;
};

export default async function ProfilePage({ params }: Props) {
  const headersList = await headers();
  const userId = headersList.get("x-user-id");
  const { username } = await params;
  const profileUserId = await userIdFromUsername(username);

  let following = false;
  let amountOfFollowers = 0;
  let amountOfFollowing = 0;

  if (!userId || !profileUserId) {
    return <div>User not found</div>;
  }

  const doWeFollow = await prisma.relationships.findFirst({
    where: { followerId: userId, followingId: profileUserId },
  });
  const getFollowerAmount = await prisma.relationships.count({
    where: { followingId: profileUserId },
  });
  const getFollowingAmount = await prisma.relationships.count({
    where: { followerId: profileUserId },
  });
  amountOfFollowers = getFollowerAmount;
  amountOfFollowing = getFollowingAmount;

  if (doWeFollow) {
    following = true;
  }

  let isOurProfile = false;
  if (profileUserId === userId) {
    isOurProfile = true;
  }

  const handleFollowUser = async () => {
    "use server";
    if (doWeFollow) {
      await prisma.relationships.delete({
        where: { id: doWeFollow.id },
      });
    } else {
      await prisma.relationships.create({
        data: { followerId: userId, followingId: profileUserId },
      });
    }
    revalidatePath(`/profile/${username}`);
  };

  const posts = await getPosts(profileUserId);

  return (
    <main>
      <div className="bg-bg-secondary p-6 rounded-md">
        <h1 className="text-headline-text text-lg font-bold">{username}</h1>
        <div className="mt-1 flex flex-row gap-2 text-sm">
          <span className="hover:text-headline-text hover:cursor-pointer">
            {amountOfFollowers} followers
          </span>
          <span className="hover:text-headline-text hover:cursor-pointer">
            {amountOfFollowing} following
          </span>
        </div>

        {!isOurProfile && (
          <form action={handleFollowUser}>
            <button
              className={`text-button-text p-2 px-4 rounded-md text-sm mt-4 font-bold
              ${
                following
                  ? "bg-bg-button-secondary border border-bg-button hover:bg-bg-button transition-colors duration-75"
                  : "bg-bg-button hover:bg-bg-button-secondary shadow-md border"
              }
              `}
            >
              {following ? "unfollow" : "follow"}
            </button>
          </form>
        )}
      </div>
      <ul className="rounded-md m-6 text-sm text-headline-text py-1">
        {posts.map((post, index) => {
          const isFirst = index === 0;
          let likesLabel: React.ReactNode;
          if (post.likes.length === 0 || post.likes.length > 1) {
            likesLabel = (
              <span className="text-paragraph-text">
                <strong className="text-headline-text">{post.likes.length}</strong> likes
              </span>
            );
          } else {
            likesLabel = (
              <span className="text-paragraph-text">
                <strong className="text-headline-text">{post.likes.length}</strong> like
              </span>
            );
          }

          return (
            <li
              key={post.id}
              className={`bg-bg-secondary p-6 ${isFirst ? "mt-0" : "mt-4"} rounded-md`}
            >
              <span>{post.status}</span>
              <span className="block font-bold text-paragraph-text text-xs mt-2">
                {formatDate(post.createdAt)}
              </span>
              <Pill className="w-fit mt-2 cursor-default">{likesLabel}</Pill>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
