import { useState } from "react";
import Image from "next/image";
import { useAuthStore, User } from "@/store/authStore";

export default function Desktop() {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  // Use the logout function from the authStore
  const logout = useAuthStore((state) => state.logout);

  // Use isAuthenticated from the authStore
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div className="h-screen w-screen relative">
      <Image
        src="https://images.unsplash.com/photo-1498598457418-36ef20772bb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        alt="Desktop background"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2 flex justify-between items-center">
        <button
          onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Start
        </button>
        {isAuthenticated && ( // Only show logout button if authenticated
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        )}
      </div>
      {isStartMenuOpen && (
        <div className="absolute bottom-12 left-0 w-64 bg-black bg-opacity-70 text-white p-4 rounded-tr-lg">
          <p>Start Menu</p>
        </div>
      )}
    </div>
  );
}
