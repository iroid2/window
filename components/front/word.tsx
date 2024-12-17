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
  Undo,
  Redo,
  Printer,
  Scissors,
  Copy,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link2,
  ImageIcon,
  Table,
  ChevronDown,
  Share2,
  History,
} from "lucide-react";

interface WordProps {
  onClose: () => void;
  isMaximized: boolean;
  onMaximize: () => void;
  onMinimize: () => void;
}

export default function Word({
  onClose,
  isMaximized,
  onMaximize,
  onMinimize,
}: WordProps) {
  const [content, setContent] = useState("");
  const [zoom, setZoom] = useState("100%");

  return (
    <div
      className={`fixed ${
        isMaximized ? "inset-0" : "top-4 left-4 w-3/4 h-3/4"
      } bg-white text-black rounded-lg shadow-lg flex flex-col overflow-hidden`}
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between px-2 h-9 bg-[#f3f3f3]">
        <div className="flex items-center gap-2">
          <img src="/images/word.png" alt="Word" className="w-4 h-4" />
          <span className="text-sm">Untitled document - Word</span>
        </div>
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 hover:bg-gray-200"
            onClick={onMinimize}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 hover:bg-gray-200"
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
            className="h-7 w-7 hover:bg-red-500 hover:text-white"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Menu Bar */}
      <div className="flex items-center gap-4 px-4 py-1 border-b">
        <Button variant="ghost" size="sm">
          File
        </Button>
        <Button variant="ghost" size="sm">
          Edit
        </Button>
        <Button variant="ghost" size="sm">
          View
        </Button>
        <Button variant="ghost" size="sm">
          Insert
        </Button>
        <Button variant="ghost" size="sm">
          Format
        </Button>
        <Button variant="ghost" size="sm">
          Tools
        </Button>
        <Button variant="ghost" size="sm">
          Extensions
        </Button>
        <Button variant="ghost" size="sm">
          Help
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col border-b">
        <div className="flex items-center gap-2 p-1 border-b">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Undo className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Redo className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Printer className="h-4 w-4" />
          </Button>
          <div className="w-px h-6 bg-gray-300" />
          <select className="h-8 px-2 border rounded">
            <option>Normal text</option>
          </select>
          <select className="h-8 px-2 border rounded">
            <option>Arial</option>
          </select>
          <div className="flex items-center border rounded">
            <Button variant="ghost" size="sm">
              11
            </Button>
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>

        <div className="flex items-center gap-2 p-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Bold className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Italic className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Underline className="h-4 w-4" />
          </Button>
          <div className="w-px h-6 bg-gray-300" />
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <AlignRight className="h-4 w-4" />
          </Button>
          <div className="w-px h-6 bg-gray-300" />
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <List className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ListOrdered className="h-4 w-4" />
          </Button>
          <div className="w-px h-6 bg-gray-300" />
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Link2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ImageIcon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Table className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 min-h-0">
        {/* Document Tabs */}
        <div className="w-48 border-r bg-gray-50 p-4">
          <h3 className="text-sm font-medium mb-2">Document tabs</h3>
          <div className="flex items-center justify-between bg-blue-50 p-2 rounded">
            <span className="text-sm">Tab 1</span>
            <Button variant="ghost" size="sm">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Headings that you add to the document will appear here.
          </p>
        </div>

        {/* Editor */}
        <div className="flex-1 p-8">
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
            <option>50%</option>
            <option>75%</option>
            <option>100%</option>
            <option>125%</option>
            <option>150%</option>
          </select>
        </div>
      </div>
    </div>
  );
}
