'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface NavigationProps {
  username: string;
}

export function Navigation({ username }: NavigationProps) {
  const pathname = usePathname();
  
  const isOnOurProfile = pathname === `/profile/${username}`;
  const isOnOtherProfile = pathname?.startsWith('/profile/') && pathname !== `/profile/${username}`;
  const isOnDashboard = pathname === "/dashboard";

  return (
    <ul className="rounded-md text-sm text-headline-text py-1">
      <li className={`p-2 px-4 rounded-md bg-bg-card cursor-pointer shadow-md font-bold
        ${isOnDashboard ? "border border-bg-button" : ""}`}>
        <Link href="/dashboard">dashboard</Link>
      </li>
      <li className={`p-2 px-4 my-4 rounded-md bg-bg-card cursor-pointer shadow-md font-bold
        ${isOnOurProfile ? "border border-bg-button" : ""}`}>
        <Link href={`/profile/${username}`}>your profile</Link>
      </li>
      <li className={`p-2 px-4 rounded-md bg-bg-card cursor-pointer shadow-md font-bold
        ${isOnOtherProfile ? "border border-bg-button" : ""}`}>
        profile view
      </li>
    </ul>
  );
}
