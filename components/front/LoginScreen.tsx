"use client";

import { useState } from "react";

import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Fingerprint, Key, Grid3X3, SmilePlus, Lock } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export default function LoginScreen() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const login = useAuthStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Allow any password to login
    // @ts-ignore
    login({ id: "1", username: "iroid", email: "iroid@example.com" });
  };

  return (
    <div className="relative h-screen w-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
      {/* Background blur effect */}
      <div className="absolute inset-0 bg-[url('/windows-blur.svg')] bg-cover bg-center opacity-20" />

      <div className="z-10 flex flex-col items-center space-y-6 text-white">
        {/* Profile Picture */}
        <div className="relative w-32 h-32">
          <Avatar className="w-full h-full">
            <AvatarImage
              src="https://avatars.githubusercontent.com/u/104001652?v=4"
              alt="iroid"
              className="object-cover"
            />
            <AvatarFallback>IR</AvatarFallback>
          </Avatar>
        </div>

        {/* Username */}
        <h1 className="text-2xl font-semibold">iroid</h1>

        {/* Fingerprint Icon */}
        <div className="flex flex-col items-center space-y-2">
          <Fingerprint className="w-8 h-8 text-white/80" />
          <p className="text-sm text-white/80 text-center max-w-[250px]">
            To sign in, scan your finger on
            <br />
            the fingerprint reader
          </p>
        </div>

        {/* Sign in form */}
        <form onSubmit={handleSubmit} className="mt-4 w-full max-w-[250px]">
          {showPassword ? (
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                placeholder="Enter password"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
              >
                →
              </button>
            </div>
          ) : null}
        </form>

        {/* Sign in options */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-6">
          <button
            onClick={() => setShowPassword(true)}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            title="Password"
          >
            <Key className="w-6 h-6 text-white/80" />
          </button>
          <button
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            title="PIN"
          >
            <Grid3X3 className="w-6 h-6 text-white/80" />
          </button>
          <button
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            title="Windows Hello"
          >
            <SmilePlus className="w-6 h-6 text-white/80" />
          </button>
          <button
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            title="Security Key"
          >
            <Lock className="w-6 h-6 text-white/80" />
          </button>
        </div>

        {/* Network and Accessibility */}
        <div className="absolute bottom-8 right-8 flex space-x-4 text-white/80">
          <div className="flex items-center space-x-1">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
            </svg>
          </div>
          <div className="flex items-center space-x-1">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M4.5 10.5H18V15H4.5v-4.5zM3.75 18h15A2.25 2.25 0 0021 15.75v-6a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 001.5 9.75v6A2.25 2.25 0 003.75 18z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
