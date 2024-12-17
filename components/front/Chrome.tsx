"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Star,
  Home,
  Settings,
  X,
  Minus,
  Square,
  Search,
  Mic,
  Image,
  Maximize2,
  Minimize2,
  Plus,
} from "lucide-react";

interface ChromeProps {
  onClose: () => void;
  isMaximized: boolean;
  onMaximize: () => void;
  onMinimize: () => void;
}

export default function Chrome({
  onClose,
  isMaximized,
  onMaximize,
  onMinimize,
}: ChromeProps) {
  const [tabs, setTabs] = useState([
    { id: 1, url: "https://google.com", title: "New Tab" },
  ]);
  const [activeTab, setActiveTab] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const addTab = () => {
    const newTab = {
      id: tabs.length + 1,
      url: "https://google.com",
      title: "New Tab",
    };
    setTabs([...tabs, newTab]);
    setActiveTab(newTab.id);
  };

  const closeTab = (id: number) => {
    if (tabs.length > 1) {
      const newTabs = tabs.filter((tab) => tab.id !== id);
      setTabs(newTabs);
      if (activeTab === id) {
        setActiveTab(newTabs[newTabs.length - 1].id);
      }
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const activeTabIndex = tabs.findIndex((tab) => tab.id === activeTab);
    const updatedTabs = [...tabs];
    updatedTabs[activeTabIndex] = {
      ...updatedTabs[activeTabIndex],
      url: `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`,
      title: searchQuery,
    };
    setTabs(updatedTabs);
  };

  return (
    <div
      className={`fixed ${
        isMaximized ? "inset-0" : "top-4 left-4 w-3/4 h-3/4"
      } bg-[#202020] text-white rounded-lg shadow-lg flex flex-col overflow-hidden`}
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between px-2 h-9 bg-[#1f1f1f]">
        <div className="flex items-center gap-2">
          <img src="/chrome-icon.png" alt="Chrome" className="w-4 h-4" />
          <span className="text-sm">
            {tabs.find((tab) => tab.id === activeTab)?.title} - Google Chrome
          </span>
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

      {/* Tabs */}
      <div className="flex items-center gap-1 px-2 py-1 bg-[#2b2b2b] overflow-x-auto">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`flex items-center gap-2 px-3 py-1 ${
              activeTab === tab.id ? "bg-[#333]" : "bg-[#2b2b2b]"
            } rounded-t text-sm cursor-pointer`}
            onClick={() => setActiveTab(tab.id)}
          >
            <img src="/google-favicon.png" alt="Google" className="w-4 h-4" />
            {tab.title}
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 hover:bg-[#444]"
              onClick={() => closeTab(tab.id)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 hover:bg-[#333]"
          onClick={addTab}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 bg-[#2b2b2b]">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <RefreshCw className="h-4 w-4" />
        </Button>
        <form onSubmit={handleSearch} className="flex-1 relative">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Google or type a URL"
            className="h-8 bg-[#333] border-0 pr-24"
          />
          <div className="absolute right-2 top-2 flex items-center gap-2">
            <Star className="h-4 w-4 text-gray-400" />
            <Settings className="h-4 w-4 text-gray-400" />
          </div>
        </form>
      </div>

      {/* Content */}
      <div className="flex-1 bg-[#35363a] p-8 flex flex-col items-center justify-start overflow-auto">
        <img src="/google-logo.png" alt="Google" className="w-72 mb-8" />
        <form onSubmit={handleSearch} className="w-full max-w-2xl relative">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Google or type a URL"
            className="h-12 bg-[#202020] border-0 pl-12 pr-24"
          />
          <Search className="absolute left-4 top-4 h-4 w-4 text-gray-400" />
          <div className="absolute right-4 top-4 flex items-center gap-4">
            <Mic className="h-4 w-4 text-gray-400" />
            <Image className="h-4 w-4 text-gray-400" />
          </div>
        </form>

        {/* Shortcuts */}
        <div className="grid grid-cols-5 gap-8 mt-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-[#202020] flex items-center justify-center">
                <Home className="h-6 w-6" />
              </div>
              <span className="text-sm">Shortcut {i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
