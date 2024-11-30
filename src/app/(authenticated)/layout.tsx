import { AuthProvider } from "@/contexts/AuthContext";
import { getFollowerAmount, getFollowingAmount, usernameFromUserId } from "@/utils/user";
import { headers } from "next/headers";
import Link from "next/link";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const headerList = await headers();

    const pathname = headerList.get("x-pathname");
    const userId = headerList.get("x-user-id") as string;

    const username = await usernameFromUserId(userId); 

    const isOnOurProfile = pathname === `/profile/${username}`;
    const isOnOtherProfile = pathname?.startsWith(`/profile/`) && pathname !== `/profile/${username}`;
    const isOnDashboard = pathname === "/dashboard";

    // if (userId) {
        //   const username = await usernameFromUserId(userId as string);
        //   const isOnOurProfile = pathname === `/profile/${username}`;
        //   const isOnOtherProfile = pathname?.startsWith(`/profile/`) && pathname !== `/profile/${username}`;
        //   const isOnDashboard = pathname === "/dashboard";
      
        //   return (
        //     <html lang="en">
        //       <body>
        //         <AuthProvider>
        //           <main className="max-w-screen-lg mx-auto grid md:grid-cols-dashboard grid-cols-1 gap-4 items-start">
        //             <section className="">
        //               <div className="bg-bg-secondary rounded-md p-4 m-6">
        //                 <h1 className="text-headline-text text-lg font-bold flex flex-row gap-2">
        //                   <span className="text-paragraph-text">@</span>
        //                   <span className="font-bold">{username}</span>
        //                 </h1>
        //                 <div className="mt-1 flex flex-row gap-2 text-sm">
        //                   <span className="hover:text-headline-text hover:cursor-pointer">{getFollowerAmount(userId as string)} followers</span>
        //                   <span className="hover:text-headline-text hover:cursor-pointer">{getFollowingAmount(userId as string)} following</span>
        //                 </div>
        //               </div>
        //               <ul className="rounded-md m-6 text-sm text-headline-text py-1">
        //                 <li className={
        //                   `p-2 px-4 m-4 rounded-md bg-[#16161650] hover:bg-bg-secondary hover:cursor-pointer shadow-md font-bold
        //                   ${isOnDashboard ? "border border-bg-button" : ""}
        //                   `
        //                 }>dashboard</li>
        //                 <li className={`
        //                   p-2 px-4 m-4 rounded-md bg-[#16161650] hover:bg-bg-secondary hover:cursor-pointer font-bold
        //                   ${isOnOurProfile ? "border border-bg-button" : ""}
        //                   `}>your profile</li>
        //                 <li className={`
        //                   p-2 px-4 m-4 rounded-md bg-[#16161650] hover:bg-bg-secondary hover:cursor-pointer font-bold
        //                   ${isOnOtherProfile ? "border border-bg-button" : ""}
        //                   `}>profile view</li>
        //               </ul>
        //               <p className="text-paragraph-text text-xs text-center m-6 cursor-pointer">logout?</p>
        //             </section>
        //             {children}
        //           </main>
        //         </AuthProvider>
        //       </body>
        //     </html>
        //   );
        // }
    return (
                <AuthProvider>
                  <main className="max-w-screen-lg mx-auto grid md:grid-cols-dashboard grid-cols-1 gap-4 items-start">
                    <section className="">
                      <div className="bg-bg-secondary rounded-md p-4 m-6">
                        <h1 className="text-headline-text text-lg font-bold flex flex-row gap-2">
                          <span className="text-paragraph-text">@</span>
                          <span className="font-bold">{username}</span>
                        </h1>
                        <div className="mt-1 flex flex-row gap-2 text-sm">
                          <span className="hover:text-headline-text hover:cursor-pointer">{getFollowerAmount(userId as string)} followers</span>
                          <span className="hover:text-headline-text hover:cursor-pointer">{getFollowingAmount(userId as string)} following</span>
                        </div>
                      </div>
                      <ul className="rounded-md m-6 text-sm text-headline-text py-1">
                        <li className={
                          `p-2 px-4 m-4 rounded-md bg-bg-secondary cursor-pointer shadow-md font-bold
                          ${isOnDashboard ? "border border-bg-button" : ""}
                          `
                        }>
                            <Link href="/dashboard">dashboard</Link>
                        </li>
                        <li className={`
                          p-2 px-4 m-4 rounded-md bg-bg-secondary cursor-pointer shadow-md font-bold
                          ${isOnOurProfile ? "border border-bg-button" : ""}
                          `}>
                            <Link href={`/profile/${username}`}>your profile</Link>
                          </li>
                        <li className={`
                          p-2 px-4 m-4 rounded-md bg-bg-secondary cursor-pointer shadow-md font-bold
                          ${isOnOtherProfile ? "border border-bg-button" : ""}
                          `}>profile view</li>
                      </ul>
                      <p className="text-paragraph-text text-xs text-center m-6 cursor-pointer">logout?</p>
                    </section>
                    {children}
                  </main>
                </AuthProvider>
          );
        }

