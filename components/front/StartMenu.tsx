import Image from "next/image";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface StartMenuProps {
  onClose: () => void;
  onOpenApp: (appName: string) => void;
}

export default function StartMenu({ onClose, onOpenApp }: StartMenuProps) {
  const pinnedApps = [
    { name: "Edge", icon: "/images/edge.png" },
    { name: "Excel", icon: "/images/excel.png" },
    { name: "Word", icon: "/images/word.png" },
    { name: "PowerPoint", icon: "/images/powerpoint.png" },
    { name: "Outlook", icon: "/images/outlook.png" },
    { name: "Publisher", icon: "/images/publisher.png" },
    { name: "Settings", icon: "/images/settings.png" },
    { name: "Calculator", icon: "/images/calculator.png" },
    { name: "File Explorer", icon: "/images/file-explorer.png" },
  ];

  const recommendedItems = [
    {
      name: "Windows Test Questions.docx",
      icon: "/images/word.png",
      time: "10h ago",
    },
    {
      name: "Windows Review Questions.docx",
      icon: "/images/word.png",
      time: "20h ago",
    },
    {
      name: "Windows Study Guide.docx",
      icon: "/images/word.png",
      time: "23h ago",
    },
  ];

  const handleAppClick = (appName: string) => {
    onOpenApp(appName);
    onClose();
  };

  return (
    <div
      className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[640px] bg-black/70 backdrop-blur-2xl rounded-lg shadow-2xl p-4 text-white"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
        <Input
          type="text"
          placeholder="Type here to search"
          className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/50"
        />
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-sm font-semibold">Pinned</h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white"
          >
            All apps
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {pinnedApps.map((app) => (
            <button
              key={app.name}
              className="flex items-center p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => handleAppClick(app.name)}
            >
              <div className="w-8 h-8 mr-3 relative">
                <Image src={app.icon} alt={app.name} width={32} height={32} />
              </div>
              <span>{app.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-sm font-semibold">Recommended</h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white"
          >
            More
          </Button>
        </div>
        <div className="space-y-2">
          {recommendedItems.map((item) => (
            <button
              key={item.name}
              className="flex items-center w-full p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => handleAppClick("Word")}
            >
              <div className="w-6 h-6 mr-3 relative">
                <Image src={item.icon} alt={item.name} width={24} height={24} />
              </div>
              <div className="flex-1 text-left">
                <span className="block text-sm">{item.name}</span>
                <span className="text-xs text-white/50">{item.time}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
