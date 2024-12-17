"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  X,
  Minus,
  Square,
  Maximize2,
  Minimize2,
  Home,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

interface PersonalizationSettingsProps {
  onClose: () => void;
  isMaximized: boolean;
  onMaximize: () => void;
  onMinimize: () => void;
  onChangeBackground: (imagePath: string) => void;
}

export default function PersonalizationSettings({
  onClose,
  isMaximized,
  onMaximize,
  onMinimize,
  onChangeBackground,
}: PersonalizationSettingsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFit, setSelectedFit] = useState("fill");

  const wallpapers = [
    "/images/windows-1.jpg",
    "/images/windows-2.jpg",
    "/images/windows-3.jpg",
    "/images/windows-4.jpg",
    "/images/windows-5.jpg",
  ];

  const navigationItems = [
    { icon: <Home className="w-5 h-5" />, label: "Home" },
    {
      label: "Personalization",
      items: [
        "Background",
        "Colors",
        "Lock screen",
        "Themes",
        "Fonts",
        "Start",
        "Taskbar",
      ],
    },
  ];

  return (
    <div
      className={`fixed ${
        isMaximized ? "inset-0" : "top-4 left-4 w-3/4 h-3/4"
      } bg-[#202020] text-white rounded-lg shadow-lg flex flex-col overflow-hidden`}
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between px-2 h-9 bg-[#1f1f1f]">
        <div className="flex items-center gap-2">
          <img src="/images/settings.png" alt="Settings" className="w-4 h-4" />
          <span className="text-sm">Settings</span>
        </div>
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 hover:bg-[#333]"
            onClick={onMinimize}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 hover:bg-[#333]"
            onClick={onMaximize}
          >
            {isMaximized ? (
              <Minimize2 className="h-3 w-3" />
            ) : (
              <Maximize2 className="h-3 w-3" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 hover:bg-[#333] hover:text-red-400"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <div className="w-80 bg-[#2d2d2d] p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Find a setting"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#202020] border-0"
            />
          </div>

          <div className="space-y-6">
            {navigationItems.map((item, index) => (
              <div key={index}>
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#404040]">
                  {item.icon}
                  <span>{item.label}</span>
                  {item.items && <ChevronRight className="w-4 h-4 ml-auto" />}
                </div>
                {item.items && (
                  <div className="mt-1 ml-10 space-y-1">
                    {item.items.map((subItem) => (
                      <div
                        key={subItem}
                        className={`px-3 py-2 rounded-lg hover:bg-[#404040] ${
                          subItem === "Background" ? "bg-[#404040]" : ""
                        }`}
                      >
                        {subItem}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto">
          <h1 className="text-2xl font-semibold mb-6">Background</h1>

          <div className="space-y-6">
            <div>
              <label className="block text-sm mb-2">
                Choose your background type
              </label>
              <select className="w-full bg-[#2d2d2d] border-0 rounded-md p-2">
                <option>Picture</option>
                <option>Solid color</option>
                <option>Slideshow</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2">Choose your picture</label>
              <div className="grid grid-cols-5 gap-4">
                {wallpapers.map((wallpaper, index) => (
                  <button
                    key={index}
                    className="relative aspect-video rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 focus:ring-2 focus:ring-blue-500"
                    onClick={() => onChangeBackground(wallpaper)}
                  >
                    <Image
                      src={wallpaper}
                      alt={`Wallpaper ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </button>
                ))}
              </div>
              <Button variant="secondary" className="mt-4">
                Browse
              </Button>
            </div>

            <div>
              <label className="block text-sm mb-2">Choose a fit</label>
              <select
                className="w-full bg-[#2d2d2d] border-0 rounded-md p-2"
                value={selectedFit}
                onChange={(e) => setSelectedFit(e.target.value)}
              >
                <option value="fill">Fill</option>
                <option value="fit">Fit</option>
                <option value="stretch">Stretch</option>
                <option value="tile">Tile</option>
                <option value="center">Center</option>
                <option value="span">Span</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
