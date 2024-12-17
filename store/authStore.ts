import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
  checkSession: () => boolean;
}

const TIMEOUT_DURATION = 20 * 60 * 1000; // 20 minutes in milliseconds

export const useAuthStore = create(
  persist<AuthState>(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      login: (username: string) => {
        set({ isAuthenticated: true, user: username });
        localStorage.setItem("sessionStartTime", Date.now().toString());
      },
      logout: () => {
        set({ isAuthenticated: false, user: null });
        localStorage.removeItem("sessionStartTime");
      },
      checkSession: () => {
        const sessionStartTime = localStorage.getItem("sessionStartTime");
        if (sessionStartTime) {
          const currentTime = Date.now();
          const sessionDuration = currentTime - parseInt(sessionStartTime);
          if (sessionDuration > TIMEOUT_DURATION) {
            get().logout();
            return false;
          }
          return true;
        }
        return false;
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
