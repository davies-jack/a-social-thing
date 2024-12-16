import Button from "@/components/atoms/Button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <section className="hero">
        <h1 className="text-headline-text text-lg font-bold">a-social</h1>
        <p className="text-paragraph-text text-sm mb-6">
          a social media platform. speak less, say more.
        </p>

        <Link href="/auth/register">
          <Button label="register now!" className="block" />
        </Link>

        <div className="mt-4">
          <Link href="/auth/login">
            <span className="text-paragraph-text text-xs">
              already have an account? login here.
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
