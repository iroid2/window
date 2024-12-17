"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Files,
  Search,
  GitBranch,
  Play,
  ExpandIcon as Extension,
  Settings,
  X,
  Minus,
  Square,
  FolderOpen,
  FilePlus,
  GitFork,
  Maximize2,
  Minimize2,
} from "lucide-react";

interface VSCodeProps {
  onClose: () => void;
  isMaximized: boolean;
  onMaximize: () => void;
  onMinimize: () => void;
}

export default function VSCode({
  onClose,
  isMaximized,
  onMaximize,
  onMinimize,
}: VSCodeProps) {
  return (
    <div
      className={`fixed ${
        isMaximized ? "inset-0" : "top-4 left-4 w-3/4 h-3/4"
      } bg-[#1e1e1e] text-white rounded-lg shadow-lg flex flex-col overflow-hidden`}
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between px-2 h-9 bg-[#1f1f1f]">
        <div className="flex items-center gap-2">
          <img src="/vscode-icon.png" alt="VS Code" className="w-4 h-4" />
          <span className="text-sm">Welcome - Visual Studio Code</span>
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
        {/* Activity Bar */}
        <div className="w-12 bg-[#333] flex flex-col items-center py-2 gap-4">
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Files className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <GitBranch className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Play className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Extension className="h-5 w-5" />
          </Button>
          <div className="flex-1" />
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        {/* Sidebar */}
        <div className="w-64 border-r border-[#333] overflow-auto">
          <div className="p-4">
            <h2 className="text-xl font-light mb-6">Visual Studio Code</h2>
            <h3 className="text-lg mb-4">Start</h3>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <FilePlus className="h-4 w-4 mr-2" />
                New File...
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <FolderOpen className="h-4 w-4 mr-2" />
                Open Folder...
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <GitFork className="h-4 w-4 mr-2" />
                Clone Repository...
              </Button>
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 p-6">
          <h1 className="text-4xl font-light mb-4">Visual Studio Code</h1>
          <p className="text-xl text-gray-400 mb-8">Editing evolved</p>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg mb-4">Recent</h3>
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Button
                    key={i}
                    variant="ghost"
                    className="w-full justify-start text-blue-400"
                  >
                    Project {i + 1}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg mb-4">Getting Started</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  Interface Overview
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Learn the Fundamentals
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
