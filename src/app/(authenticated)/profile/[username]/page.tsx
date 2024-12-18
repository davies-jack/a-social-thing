import Container from "@/components/atoms/Container";
import Paragraph from "@/components/atoms/Paragraph";
import Pill from "@/components/atoms/Pill/";
import TimelinePost from "@/components/molecules/TimelinePost";
import prisma from "@/utils/db";
import { getPosts } from "@/utils/posts";
import { userIdFromUsername } from "@/utils/user";
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

  let amountOfFollowers = 0;
  let amountOfFollowing = 0;

  if (!userId || !profileUserId) {
    return <div>User not found</div>;
  }

  // const doWeFollow = await prisma.relationships.findFirst({
  //   where: { followerId: userId, followingId: profileUserId },
  // });
  const getFollowerAmount = await prisma.relationships.count({
    where: { followingId: profileUserId },
  });
  const getFollowingAmount = await prisma.relationships.count({
    where: { followerId: profileUserId },
  });
  amountOfFollowers = getFollowerAmount;
  amountOfFollowing = getFollowingAmount;

  // if (doWeFollow) {
  //   following = true;
  // }

  // let isOurProfile = false;
  // if (profileUserId === userId) {
  //   isOurProfile = true;
  // }

  // const handleFollowUser = async () => {
  //   "use server";
  //   if (doWeFollow) {
  //     await prisma.relationships.delete({
  //       where: { id: doWeFollow.id },
  //     });
  //   } else {
  //     await prisma.relationships.create({
  //       data: { followerId: userId, followingId: profileUserId },
  //     });
  //   }
  //   revalidatePath(`/profile/${username}`);
  // };

  const posts = await getPosts(profileUserId);

  return (
    <section>
      <Container>
        <h1 className="flex flex-row items-center justify-between gap-2">
          <div className="flex flex-row items-center gap-2">
            <div className="animate-pulse h-2 w-2 rounded-full bg-[lime]"></div> {username}
          </div>
          <div className="flex flex-row items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="#94a1b2"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <Paragraph>manchester</Paragraph>
          </div>
        </h1>
        <ul className="flex flex-row gap-2 mt-2">
          <li>
            <Pill darker>{amountOfFollowers} followers</Pill>
          </li>
          <li>
            <Pill darker>{amountOfFollowing} following</Pill>
          </li>
        </ul>
        <div className="mt-4">
          <Paragraph>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam dolorum quasi et quaerat
            molestias obcaecati, explicabo necessitatibus mollitia alias est laboriosam rerum. Iusto
            nesciunt, dolorum eveniet itaque quidem hic cumque?
          </Paragraph>
        </div>
      </Container>

      <ul className="mt-4 flex flex-col gap-4 w-2/3 mx-auto">
        {posts.map((post) => {
          const singlePost = {
            ...post,
            hasLiked: false,
            commentAmount: post.comments.length,
            likes: post.likes,
            user: {
              username: post.user.username,
            },
          };
          return <TimelinePost key={post.id} post={singlePost} toggleLikePost={() => {}} />;
        })}
      </ul>
    </section>
  );
}
