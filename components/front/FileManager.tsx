"use client";

import { useState, useEffect } from "react";

interface FileManagerProps {
  onClose: () => void;
  isMaximized: boolean;
  onMaximize: () => void;
  onMinimize: () => void;
  initialPath?: string | null;
  isRecycleBin?: boolean;
}

export default function FileManager({
  onClose,
  isMaximized,
  onMaximize,
  onMinimize,
  initialPath = "This PC > Desktop",
  isRecycleBin = false,
}: FileManagerProps) {
  const [selectedPath, setSelectedPath] = useState(initialPath);
  const [items, setItems] = useState<
    Array<{ name: string; type: string; icon: string }>
  >([]);

  useEffect(() => {
    if (isRecycleBin) {
      setItems([]); // Empty state for Recycle Bin
    } else {
      // Simulate folder contents
      setItems([
        { name: "Documents", type: "folder", icon: "/images/folder.png" },
        { name: "Downloads", type: "folder", icon: "/images/folder.png" },
        { name: "Pictures", type: "folder", icon: "/images/folder.png" },
        { name: "report.docx", type: "file", icon: "/images/word.png" },
        {
          name: "presentation.pptx",
          type: "file",
          icon: "/images/powerpoint.png",
        },
      ]);
    }
  }, [isRecycleBin]);

  return (
    <div
      className={`fixed ${
        isMaximized ? "inset-0" : "top-4 left-4 w-3/4 h-3/4"
      } bg-[#202020] text-white rounded-lg shadow-lg flex flex-col overflow-hidden`}
    >
      <div className="flex justify-between items-center mb-4 p-4">
        <h2 className="text-xl font-bold">File Explorer</h2>
        <div className="flex gap-2">
          <button
            onClick={onMinimize}
            className="text-gray-500 hover:text-gray-700"
          >
            Minimize
          </button>
          <button
            onClick={onMaximize}
            className="text-gray-500 hover:text-gray-700"
          >
            Maximize
          </button>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-auto">
        {items.length > 0 ? (
          <div className="grid grid-cols-4 gap-4">
            {items.map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 p-2 hover:bg-[#333] rounded cursor-pointer"
              >
                <img src={item.icon} alt={item.type} className="h-8 w-8" />
                <span className="text-sm">{item.name}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            {isRecycleBin ? (
              <>
                <img
                  src="/images/recycle-bin-empty.png"
                  alt="Empty Recycle Bin"
                  className="w-16 h-16 mb-4"
                />
                <p>Recycle Bin is empty</p>
              </>
            ) : (
              <>
                <img
                  src="/images/folder-empty.png"
                  alt="Empty Folder"
                  className="w-16 h-16 mb-4"
                />
                <p>This folder is empty</p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-[#1f1f1f] border-t border-[#333] px-2 flex items-center">
        <span className="text-xs text-gray-400">
          {items.length} {items.length === 1 ? "item" : "items"}
        </span>
      </div>
    </div>
  );
}
