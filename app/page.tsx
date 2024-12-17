"use client";

import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import LockScreen from "@/components/front/LockScreen";
import CreateAccount from "@/components/front/CreateAccount";
import LoginScreen from "@/components/front/LoginScreen";
import Desktop from "@/components/front/Desktop";

export default function Home() {
  const [isLocked, setIsLocked] = useState(true);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isLocked) {
    return <LockScreen onUnlock={() => setIsLocked(false)} />;
  }

  if (!isAuthenticated) {
    if (showCreateAccount) {
      return (
        <div>
          <CreateAccount />
          <button
            onClick={() => setShowCreateAccount(false)}
            className="absolute top-4 right-4 text-white/70 hover:text-white"
          >
            Back to Login
          </button>
        </div>
      );
    }
    return (
      <div>
        <LoginScreen />
        <button
          onClick={() => setShowCreateAccount(true)}
          className="absolute bottom-4 right-4 text-white/70 hover:text-white"
        >
          Create Account
        </button>
      </div>
    );
  }

  return <Desktop />;
}
