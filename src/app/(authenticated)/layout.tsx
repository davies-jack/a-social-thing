import { AuthProvider } from "@/contexts/AuthContext";
import { getFollowerAmount, getFollowingAmount, usernameFromUserId } from "@/utils/user";
import { headers } from "next/headers";
import { Navigation } from '@/components/Navigation';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const headerList = await headers();
    const userId = headerList.get("x-user-id") as string;
    const username = await usernameFromUserId(userId) as string;

    return (
      <AuthProvider>
        <main className="grid md:grid-cols-dashboard grid-cols-1 gap-4 items-start h-screen">
          <section className="pt-6 border-r-none md:border-r-2 md:border-r-bg-button block md:fixed md:w-[320px] h-auto md:h-screen px-6 bg-bg-secondary">
            <div className="bg-bg-card rounded-md p-4 mb-6">
              <h1 className="text-headline-text text-lg font-bold flex flex-row gap-2">
                <span className="text-paragraph-text">@</span>
                <span className="font-bold">{username}</span>
              </h1>
              <div className="mt-1 flex flex-row gap-2 text-sm">
                <span className="hover:text-headline-text hover:cursor-pointer">{getFollowerAmount(userId as string)} followers</span>
                <span className="hover:text-headline-text hover:cursor-pointer">{getFollowingAmount(userId as string)} following</span>
              </div>
            </div>
            <Navigation username={username} />
            <p className="text-paragraph-text text-xs text-center m-6 cursor-pointer">logout?</p>
          </section>
          <div className="md:col-start-2 overflow-y-auto h-screen pt-6 px-0 md:px-24">
            {children}
          </div>
        </main>
      </AuthProvider>
    );
}

