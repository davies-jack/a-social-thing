import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen">
      <div className="hidden md:flex md:w-1/2 bg-bg-secondary p-8 flex-col justify-center border-r border-bg-button">
        <h1 className="text-4xl text-headline-text">welcome to a-social</h1>
        <p className="text-paragraph-text text-lg mb-4 font-bold">
          connect with others in a meaningful way, without the noise of traditional social media.
        </p>
        <ul className="text-paragraph-text space-y-2">
          <li>✨ 150 characters or less, can you say more with less?</li>
          <li>🔒 privacy focused platform, your data is yours.</li>
          <li>🤝 genuine content, like what you see.</li>
        </ul>
      </div>
      {children}
    </main>
  );
}
