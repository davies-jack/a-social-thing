"use client";

import Button from "@/components/atoms/Button";
import Error from "@/components/atoms/Alert";
import InputField from "@/components/atoms/InputField";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { FormEvent, useState } from "react";
import Alert from "@/components/atoms/Alert";

function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  isLoading,
  error,
}: {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  handleSubmit: (e: FormEvent) => void;
  isLoading: boolean;
  error: string | null;
}) {
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex flex-col gap-1 items-start bg-bg-secondary p-6 rounded-md border border-bg-card shadow-md">
        <h1
          className={`font-bold text-headline-text text-xl
            ${error ? "pb-0" : "pb-3"}
            `}
        >
          <span className="text-paragraph-text font-normal">login to</span> a-social
        </h1>
        {error && <Alert type="error">{error}</Alert>}

        <InputField
          id="email"
          label="email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john@example.com"
        />

        <InputField
          id="password"
          label="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />

        <Button
          label="login"
          className={`
            mt-4 w-full
        `}
          disabled={isLoading}
        />
      </div>
    </form>
  );
}

export default function LoginPage() {
  const { login } = useAuth();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const loginResponse: {
        message: string;
        error: boolean;
      } = await login(email, password);

      if (!loginResponse.error) {
        router.push("/dashboard");
      } else {
        setError(loginResponse.message);
      }
    } catch (error: unknown) {
      setError((error as Error).message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full md:w-1/2 flex flex-col gap-12 items-center justify-center p-4">
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
      />

      <span className="text-paragraph-text text-sm mt-4">
        don&apos;t have an account?{" "}
        <Link href="/auth/register">
          <span className="cursor-pointer">register here</span>
        </Link>
      </span>
    </div>
  );
}
