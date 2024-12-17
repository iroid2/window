"use client";

import { useState } from "react";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";

export default function CreateAccount() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const login = useAuthStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    // In a real app, we would make an API call here
    login({ id: "1", username: formData.username, email: formData.email });
  };

  return (
    <div className="relative h-screen w-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
      <div className="absolute inset-0 bg-[url('/windows-blur.svg')] bg-cover bg-center opacity-20" />

      <div className="z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl">
        <h1 className="text-2xl font-semibold text-white mb-6 text-center">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
              required
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
              required
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
              required
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
              required
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}
