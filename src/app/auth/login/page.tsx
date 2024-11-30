"use client";

import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

import React, { FormEvent, useState } from "react";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (error) {
      // TODO: handle error
      console.error("Login error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="container flex flex-col gap-1 items-start bg-bg-secondary p-4 shadow-md w-full md:w-1/4">
          <h1 className="font-bold text-headline-text border-b border-bg-button mb-2 pb-1">
            <span className="text-paragraph-text font-normal">login to</span> a-social
          </h1>
          <label htmlFor="email" className="text-paragraph-text text-xs leading-none tracking-tight mb-1">
            email address
          </label>
          <InputField
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
          />
          <label
            htmlFor="password"
            className="mt-2 text-paragraph-text text-xs leading-none tracking-tight mb-1"
          >
            password
          </label>
          <InputField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          <Button label="login" className="mt-2" />
        </div>
      </div>
    </form>
  );
}
