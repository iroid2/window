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
        src="/images/lock.webp"
        alt="Lock screen background"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      <div className="z-10 text-white text-4xl sm:text-6xl md:text-8xl font-bold mb-4">
        {currentTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
      <div className="z-10 text-white text-lg sm:text-xl md:text-2xl mb-8">
        {currentTime.toLocaleDateString([], {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </div>
      <button
        onClick={onUnlock}
        className="z-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-bold py-2 px-4 rounded transition duration-200 text-sm sm:text-base"
      >
        Unlock
      </button>
    </div>
  );
}
