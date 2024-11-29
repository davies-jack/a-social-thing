import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from '@/contexts/AuthContext';

export const metadata: Metadata = {
  title: "a-social.",
  description: "a social thing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <main className="
            max-w-screen-lg mx-auto
          ">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
