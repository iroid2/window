"use client";

import {
  Bold,
  Copy,
  ImageIcon,
  Italic,
  Link2,
  ClipboardPasteIcon as Paste,
  Scissors,
  Table,
  Underline,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type WordProps = {
  onClose: () => void;
  isMaximized: boolean;
  onMaximize: () => void;
  onMinimize: () => void;
};

export default function Word({
  onClose,
  isMaximized,
  onMaximize,
  onMinimize,
}: WordProps) {
  const [activeTab, setActiveTab] = useState("home");
  const [content, setContent] = useState("");
  const [zoom, setZoom] = useState("100%");

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="flex flex-col border-b">
            {/* Clipboard */}
            <div className="flex items-center gap-2 p-1 border-b">
              <div className="flex flex-col items-center px-2 border-r">
                <Button variant="ghost" size="sm" className="h-8">
                  <Paste className="h-4 w-4 mr-2" />
                  Paste
                </Button>
              </div>
              <div className="flex flex-col items-center px-2">
                <Button variant="ghost" size="sm" className="h-8">
                  <Scissors className="h-4 w-4 mr-2" />
                  Cut
                </Button>
                <Button variant="ghost" size="sm" className="h-8">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
            </div>

            {/* Font */}
            <div className="flex items-center gap-2 p-1">
              <select className="h-8 px-2 border rounded">
                <option>Calibri</option>
              </select>
              <select className="h-8 w-20 px-2 border rounded">
                <option>11</option>
              </select>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Bold className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Italic className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Underline className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        );
      case "insert":
        return (
          <div className="flex items-center gap-4 p-2 border-b">
            <div className="flex flex-col items-center px-2">
              <Button variant="ghost" size="sm" className="h-16 w-16">
                <Table className="h-8 w-8" />
                <span className="text-xs">Table</span>
              </Button>
            </div>
            <div className="flex flex-col items-center px-2">
              <Button variant="ghost" size="sm" className="h-16 w-16">
                <ImageIcon className="h-8 w-8" />
                <span className="text-xs">Picture</span>
              </Button>
            </div>
            <div className="flex flex-col items-center px-2">
              <Button variant="ghost" size="sm" className="h-16 w-16">
                <Link2 className="h-8 w-8" />
                <span className="text-xs">Link</span>
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`fixed ${
        isMaximized ? "inset-0" : "top-4 left-4 w-3/4 h-3/4"
      } bg-white text-black rounded-lg shadow-lg flex flex-col overflow-hidden`}
    >
      {/* Title Bar */}
      <div className="flex justify-between items-center mb-4 p-4">
        <h2 className="text-xl font-bold">Microsoft Word</h2>
        <div className="flex gap-2">
          <Button onClick={onMinimize} variant="ghost" size="sm">
            Minimize
          </Button>
          <Button onClick={onMaximize} variant="ghost" size="sm">
            Maximize
          </Button>
          <Button onClick={onClose} variant="ghost" size="sm">
            Close
          </Button>
        </div>
      </div>

      {/* Ribbon */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1 px-2 border-b">
          <Button
            variant={activeTab === "home" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("home")}
          >
            Home
          </Button>
          <Button
            variant={activeTab === "insert" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("insert")}
          >
            Insert
          </Button>
          {/* Add other tabs as needed */}
        </div>
        {renderTabContent()}
      </div>

      {/* Document Area */}
      <div className="flex flex-1 min-h-0 bg-gray-100">
        <div className="flex-1 max-w-4xl mx-auto bg-white shadow-lg my-4 p-8">
          <textarea
            className="w-full h-full resize-none border-0 focus:outline-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type or paste your content here..."
          />
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-4 py-1 bg-[#f3f3f3] text-sm">
        <div className="flex items-center gap-4">
          <span>Page 1 of 1</span>
          <span>{content.length} characters</span>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
            className="bg-transparent"
          >
            <option>100%</option>
            <option>150%</option>
            <option>200%</option>
          </select>
        </div>
      </div>
    </div>
  );
}
