"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import LockScreen from "@/components/front/LockScreen";
import CreateAccount from "@/components/front/CreateAccount";
import LoginScreen from "@/components/front/LoginScreen";
import Desktop from "@/components/front/Desktop";

export default function Home() {
  const [isLocked, setIsLocked] = useState(true);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const { isAuthenticated, checkSession, logout } = useAuthStore();

  useEffect(() => {
    const validSession = checkSession();
    setIsLocked(!validSession);

    const intervalId = setInterval(() => {
      if (!checkSession()) {
        setIsLocked(true);
      }
    }, 60000); // Check every minute

    return () => clearInterval(intervalId);
  }, [checkSession]);

  if (isLocked) {
    return <LockScreen onUnlock={() => setIsLocked(false)} />;
  }

  if (!isAuthenticated) {
    if (showCreateAccount) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
          <CreateAccount />
          <button
            onClick={() => setShowCreateAccount(false)}
            className="mt-4 text-white/70 hover:text-white"
          >
            Back to Login
          </button>
        </div>
      );
    }
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
        <LoginScreen />
        <button
          onClick={() => setShowCreateAccount(true)}
          className="mt-4 text-white/70 hover:text-white"
        >
          Create Account
        </button>
      </div>
    );
  }

  return <Desktop />;
}
