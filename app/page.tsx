"use client";

import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import LockScreen from "@/components/front/LockScreen";
import LoginScreen from "@/components/front/LoginScreen";
import Desktop from "@/components/front/Desktop";

export default function Home() {
  const [isLocked, setIsLocked] = useState(true);
  const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated);

  if (isLocked) {
    return <LockScreen onUnlock={() => setIsLocked(false)} />;
  }

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return <Desktop />;
}
