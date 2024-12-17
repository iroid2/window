"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Search,
  File,
  Copy,
  Scissors,
  ClipboardPasteIcon as Paste,
  Trash,
  RefreshCw,
  X,
  Minus,
  Square,
  Maximize2,
  Minimize2,
} from "lucide-react";

interface FileManagerProps {
  onClose: () => void;
  isMaximized: boolean;
  onMaximize: () => void;
  onMinimize: () => void;
}

export default function FileManager({
  onClose,
  isMaximized,
  onMaximize,
  onMinimize,
}: FileManagerProps) {
  const [selectedPath, setSelectedPath] = useState("This PC > Desktop");

  return (
    <div
      className={`fixed ${
        isMaximized ? "inset-0" : "top-4 left-4 w-3/4 h-3/4"
      } bg-[#202020] text-white rounded-lg shadow-lg flex flex-col overflow-hidden`}
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between px-2 h-9 bg-[#1f1f1f] border-b border-[#333]">
        <div className="flex items-center gap-2">
          <img src="/images/folder.png" alt="Folder" className="w-4 h-4" />
          <span className="text-sm">File Explorer</span>
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

      {/* Toolbar */}
      <div className="flex flex-col border-b border-[#333]">
        <div className="flex items-center gap-2 p-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronDown className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-1 px-2 py-1 bg-[#333] rounded text-sm">
            {selectedPath}
          </div>
          <div className="flex-1 relative">
            <Input placeholder="Search" className="h-8 bg-[#333] border-0" />
            <Search className="absolute right-2 top-2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center gap-2 p-1 border-t border-[#333]">
          <Button variant="ghost" size="sm" className="h-8">
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          <Button variant="ghost" size="sm" className="h-8">
            <Scissors className="h-4 w-4 mr-2" />
            Cut
          </Button>
          <Button variant="ghost" size="sm" className="h-8">
            <Paste className="h-4 w-4 mr-2" />
            Paste
          </Button>
          <div className="w-px h-8 bg-[#333]" />
          <Button variant="ghost" size="sm" className="h-8">
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </Button>
          <Button variant="ghost" size="sm" className="h-8">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <div className="w-48 border-r border-[#333] p-2">
          <div className="flex items-center gap-2 p-2 hover:bg-[#333] rounded cursor-pointer">
            <img src="/images/folder.png" alt="Folder" className="h-4 w-4" />
            <span className="text-sm">Quick access</span>
          </div>
          <div className="flex items-center gap-2 p-2 hover:bg-[#333] rounded cursor-pointer">
            <img src="/images/folder.png" alt="Folder" className="h-4 w-4" />
            <span className="text-sm">Desktop</span>
          </div>
          <div className="flex items-center gap-2 p-2 hover:bg-[#333] rounded cursor-pointer">
            <img src="/images/folder.png" alt="Folder" className="h-4 w-4" />
            <span className="text-sm">Downloads</span>
          </div>
          <div className="flex items-center gap-2 p-2 hover:bg-[#333] rounded cursor-pointer">
            <img src="/images/folder.png" alt="Folder" className="h-4 w-4" />
            <span className="text-sm">Documents</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 overflow-auto">
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 p-2 hover:bg-[#333] rounded cursor-pointer"
              >
                <img
                  src="/images/folder.png"
                  alt="Folder"
                  className="h-8 w-8"
                />
                <span className="text-sm">Folder {i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-[#1f1f1f] border-t border-[#333] px-2 flex items-center">
        <span className="text-xs text-gray-400">8 items</span>
      </div>
    </div>
  );
}
