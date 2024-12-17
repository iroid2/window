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
  Monitor,
  Bluetooth,
  Phone,
  Globe,
  Palette,
  AppWindow,
  User2,
  Clock,
  Gamepad2,
  Accessibility,
  SearchIcon,
  Lock,
  RefreshCcw,
} from "lucide-react";
import Image from "next/image";

interface SettingsProps {
  onClose: () => void;
  isMaximized: boolean;
  onMaximize: () => void;
  onMinimize: () => void;
}

export default function Settings({
  onClose,
  isMaximized,
  onMaximize,
  onMinimize,
}: SettingsProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const settingsCategories = [
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "System",
      description: "Display, sound, notifications, power",
    },
    {
      icon: <Bluetooth className="w-6 h-6" />,
      title: "Devices",
      description: "Bluetooth, printers, mouse",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      description: "Link your Android, iPhone",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Network & Internet",
      description: "Wi-Fi, airplane mode, VPN",
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Personalization",
      description: "Background, lock screen, colors",
    },
    {
      icon: <AppWindow className="w-6 h-6" />,
      title: "Apps",
      description: "Uninstall, defaults, optional features",
    },
    {
      icon: <User2 className="w-6 h-6" />,
      title: "Accounts",
      description: "Your accounts, email, sync, work, family",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Time & Language",
      description: "Speech, region, date",
    },
    {
      icon: <Gamepad2 className="w-6 h-6" />,
      title: "Gaming",
      description: "Xbox Game Bar, captures, Game Mode",
    },
    {
      icon: <Accessibility className="w-6 h-6" />,
      title: "Accessibility",
      description: "Narrator, magnifier, high contrast",
    },
    {
      icon: <SearchIcon className="w-6 h-6" />,
      title: "Search",
      description: "Find my files, permissions",
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Privacy",
      description: "Location, camera, microphone",
    },
    {
      icon: <RefreshCcw className="w-6 h-6" />,
      title: "Update & Security",
      description: "Windows Update, recovery, backup",
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

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {/* Header */}
        <div className="flex items-start gap-6 mb-8">
          <div className="w-16 h-16 rounded-full bg-[#333] flex items-center justify-center">
            <User2 className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold mb-1">
              Get even more out of Windows
            </h1>
            <p className="text-gray-400 mb-4">
              With a few quick selections, you'll be on your way to enjoying the
              full Microsoft experience.
            </p>
            <div className="flex gap-4">
              <Button variant="secondary">Let's go!</Button>
              <Button variant="ghost">Skip for now</Button>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Input
            type="text"
            placeholder="Find a setting"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#333] border-0 pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {settingsCategories.map((category) => (
            <button
              key={category.title}
              className="flex items-start gap-4 p-4 rounded-lg hover:bg-[#333] transition-colors text-left"
            >
              <div className="text-blue-400">{category.icon}</div>
              <div>
                <h3 className="font-medium mb-1">{category.title}</h3>
                <p className="text-sm text-gray-400">{category.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
