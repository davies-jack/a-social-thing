import { AuthProvider } from "@/contexts/AuthContext";
import { getFollowerAmount, getFollowingAmount, usernameFromUserId } from "@/utils/user";
import { headers } from "next/headers";
import Pill from "@/components/atoms/Pill";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const userId = headerList.get("x-user-id") as string;
  const username = (await usernameFromUserId(userId)) as string;

  const followerAmount = await getFollowerAmount(userId);
  const followersSuffix = followerAmount === 1 ? "follower" : "followers";
  const followers = `${followerAmount} ${followersSuffix}`;

  const followingAmount = await getFollowingAmount(userId);
  const followingSuffix = followingAmount === 1 ? "following" : "following";
  const following = `${followingAmount} ${followingSuffix}`;

  return (
    <AuthProvider>
      <main className="grid md:grid-cols-dashboard grid-cols-1 gap-4 items-start h-screen">
        <section className="p-6 flex flex-col bg-gradient-to-b md:bg-gradient-to-r from-bg-card to-bg-bg-primary block md:fixed md:w-[320px] md:h-screen">
          <h1 className="text-headline-text">
            hey,{" "}
            <Link href={`/profile/${username}`} className="underline">
              {username}
            </Link>
            !
          </h1>

          <ul className="mt-2 flex flex-row gap-2">
            <li>
              <Pill>{followers}</Pill>
            </li>
            <li>
              <Pill>{following}</Pill>
            </li>
          </ul>

          <ul className="mt-4 md:mt-12 flex flex-row md:flex-col overflow-x-scroll gap-2">
            <li>
              <Link href="/dashboard">
                <Pill className="w-full" large>
                  Dashboard
                </Pill>
              </Link>
            </li>
            <li>
              <Pill large>
                <p>Profile</p>
              </Pill>
            </li>
            <li>
              <Pill large>
                <p>Profile</p>
              </Pill>
            </li>
            <li>
              <Pill large>
                <p>Profile</p>
              </Pill>
            </li>
          </ul>
        </section>

        <section className="md:col-start-2 overflow-y-auto h-screen pt-6 px-0 md:px-6 lg:px-24">{children}</section>
      </main>
    </AuthProvider>
  );
}
