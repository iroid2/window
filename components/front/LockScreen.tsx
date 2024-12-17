import { useState, useEffect } from "react";
import Image from "next/image";

export default function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center relative">
      <Image
        src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        alt="Lock screen background"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      <div className="z-10 text-white text-8xl font-bold mb-4">
        {currentTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
      <div className="z-10 text-white text-2xl mb-8">
        {currentTime.toLocaleDateString([], {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </div>
      <button
        onClick={onUnlock}
        className="z-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-bold py-2 px-4 rounded transition duration-200"
      >
        Unlock
      </button>
    </div>
  );
}
