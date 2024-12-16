import { getFollowersFromUserId, userIdFromUsername, usernameFromUserId } from "@/utils/user";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    username: string;
  };
};

export default async function FollowersPage({ params }: Props) {
  const headersList = await headers();
  const userId = headersList.get("x-user-id") as string;
  const usernameFromParams = params.username.trim();
  const userIdFromParams = await userIdFromUsername(usernameFromParams);
  if (!userIdFromParams) {
    redirect("/dashboard");
  }

  const followers = await getFollowersFromUserId(userIdFromParams);

  if (!userId) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Followers</h1>
      <ul>
        {followers.map(async (follower, index) => {
          const followerUser = await usernameFromUserId(follower.followerId);
          const firstThreeLetters = followerUser?.slice(0, 3);
          const key = `${firstThreeLetters}-${index}`;
          return <li key={key}>{followerUser}</li>;
        })}
      </ul>
    </div>
  );
}
