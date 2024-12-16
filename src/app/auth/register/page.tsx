"use client";

import Button from "@/components/atoms/Button/";
import Error from "@/components/atoms/Alert/";
import InputField from "@/components/atoms/InputField/";
import Pill from "@/components/atoms/Pill/";
import Link from "next/link";
import React, { FormEvent, useState } from "react";

function RegisterForm({
  email,
  setEmail,
  username,
  setUsername,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  handleSubmit,
  isLoading,
  error,
  success,
}: {
  email: string;
  setEmail: (email: string) => void;
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  error: string | null;
  success: boolean;
}) {
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex flex-col gap-1 items-start bg-bg-secondary p-6 rounded-md border border-bg-card shadow-md">
        <h1
          className={`font-bold text-headline-text text-xl
              ${error ? "pb-0" : "pb-3"}
              `}
        >
          <span className="text-paragraph-text font-normal">register to</span> a-social
        </h1>
        {error && <Error type="error">{error}</Error>}

        {success && (
          <Pill>
            <p className="font-bold text-green-700">your account has been successfully created!</p>
          </Pill>
        )}
        <InputField
          id="email"
          label="email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john@example.com"
        />
        <InputField
          id="username"
          label="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="john"
        />
        <InputField
          id="password"
          label="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <InputField
          id="confirmPassword"
          label="confirm password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="confirm password"
        />

        <Button
          label="register"
          className={`
              mt-4 w-full
          `}
          disabled={isLoading}
        />
      </div>
    </form>
  );
}
export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, username, password, confirmPassword }),
    });

    if (response.ok) {
      setSuccess(true);
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } else {
      console.error("Registration failed");
      const errorData = await response.json();
      setError(errorData.message);
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full md:w-1/2 flex flex-col gap-12 items-center justify-center p-4">
      <RegisterForm
        email={email}
        setEmail={setEmail}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
        success={success}
      />

      <span className="text-paragraph-text text-sm mt-4">
        already have an account?{" "}
        <Link href="/auth/login">
          <span className="cursor-pointer">login here</span>
        </Link>
      </span>
    </div>
  );
}
