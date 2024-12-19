"use client";

import { useState, useEffect } from "react";

import Image from "next/image";
import StartMenu from "./StartMenu";
import FileManager from "./FileManager";
import Chrome from "./Chrome";
import VSCode from "./VSCode";

import ContextMenu from "./ContextMenu";
import { Search, Wifi, Volume2, Battery, ChevronUp } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import Word from "./word";

interface DesktopItem {
  id: string;
  name: string;
  icon: string;
  type: "folder" | "file" | "image" | "recyclebin";
  path?: string;
  createdAt: Date;
}

const defaultItems: DesktopItem[] = [
  {
    id: "documents",
    name: "Documents",
    icon: "/images/folder.png",
    type: "folder",
    path: "C:\\Users\\User\\Documents",
    createdAt: new Date(),
  },
  {
    id: "downloads",
    name: "Downloads",
    icon: "/images/folder.png",
    type: "folder",
    path: "C:\\Users\\User\\Downloads",
    createdAt: new Date(),
  },
  {
    id: "pictures",
    name: "Pictures",
    icon: "/images/folder.png",
    type: "folder",
    path: "C:\\Users\\User\\Pictures",
    createdAt: new Date(),
  },
  {
    id: "recycle-bin",
    name: "Recycle Bin",
    icon: "/images/recycle-bin.png",
    type: "recyclebin",
    path: "Recycle Bin",
    createdAt: new Date(),
  },
  {
    id: "chrome",
    name: "Google Chrome",
    icon: "/images/chrome.png",
    type: "file",
    createdAt: new Date(),
  },
  {
    id: "vscode",
    name: "Visual Studio Code",
    icon: "/images/vs.png",
    type: "file",
    createdAt: new Date(),
  },
  {
    id: "word",
    name: "Microsoft Word",
    icon: "/images/word.png",
    type: "file",
    createdAt: new Date(),
  },
  {
    id: "image1",
    name: "Vacation.jpg",
    icon: "/images/image-icon.png",
    type: "image",
    createdAt: new Date(),
  },
  {
    id: "image2",
    name: "Profile.png",
    icon: "/images/image-icon.png",
    type: "image",
    createdAt: new Date(),
  },
  {
    id: "image3",
    name: "Document.pdf",
    icon: "/images/pdf-icon.png",
    type: "file",
    createdAt: new Date(),
  },
];

export default function Desktop() {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [openApp, setOpenApp] = useState<string | null>(null);
  const [desktopItems, setDesktopItems] = useState<DesktopItem[]>(defaultItems);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [currentPath, setCurrentPath] = useState<string | null>(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [openImage, setOpenImage] = useState<string | null>(null);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const taskbarIcons = [
    { name: "Search", icon: <Search className="w-5 h-5" />, action: () => {} },
    {
      name: "File Explorer",
      icon: "/images/file-explorer.png",
      action: () => setOpenApp("fileManager"),
    },
    {
      name: "Chrome",
      icon: "/images/chrome.png",
      action: () => setOpenApp("chrome"),
    },
    {
      name: "VS Code",
      icon: "/images/vs.png",
      action: () => setOpenApp("vscode"),
    },
    {
      name: "Word",
      icon: "/images/word.png",
      action: () => setOpenApp("word"),
    },
    { name: "Settings", icon: "/images/settings.png", action: () => {} },
  ];

  const handleStartClick = () => {
    setIsStartMenuOpen(!isStartMenuOpen);
    setOpenApp(null);
  };

  const handleTaskbarIconClick = (action: () => void) => {
    action();
    setIsStartMenuOpen(false);
  };

  const handleOpenApp = (appName: string) => {
    setOpenApp(appName.toLowerCase());
    setIsStartMenuOpen(false);
  };

  const handleItemNameChange = (itemId: string, newName: string) => {
    const updatedItems = desktopItems.map((item) =>
      item.id === itemId ? { ...item, name: newName } : item
    );
    setDesktopItems(updatedItems);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  const createNewFolder = () => {
    const newFolder: DesktopItem = {
      id: `folder-${Date.now()}`,
      name: "New Folder",
      icon: "/images/folder.png",
      type: "folder",
      createdAt: new Date(),
    };
    setDesktopItems([...desktopItems, newFolder]);
    setEditingItemId(newFolder.id);
    closeContextMenu();
  };

  const handleItemClick = (item: DesktopItem) => {
    switch (item.type) {
      case "folder":
      case "recyclebin":
        setOpenApp("fileManager");
        setCurrentPath(item.path || null);
        break;
      case "file":
        handleOpenApp(item.name);
        break;
      case "image":
        setOpenImage(item.name);
        break;
      default:
        break;
    }
  };

  // Calculate columns based on screen height
  const itemsPerColumn = Math.floor((window.innerHeight - 100) / 100); // 100px per item
  // @ts-ignore
  const columns: any[] = [];
  // @ts-ignore
  let currentColumn = [];

  desktopItems.forEach((item, index) => {
    currentColumn.push(item);
    if (
      currentColumn.length === itemsPerColumn ||
      index === desktopItems.length - 1
    ) {
      // @ts-ignore
      columns.push([...currentColumn]);
      currentColumn = [];
    }
  });

  return (
    <div
      className="h-screen w-screen overflow-hidden relative"
      onClick={() => {
        setIsStartMenuOpen(false);
        closeContextMenu();
      }}
      onContextMenu={handleContextMenu}
    >
      {/* Desktop Background */}
      <Image
        src="/images/desk.jpg"
        alt="Desktop Background"
        layout="fill"
        objectFit="cover"
        quality={100}
      />

      {/* Desktop Content */}
      <div className="absolute inset-0 p-4 flex gap-4">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-col gap-4">
            {column.map((item: any) => (
              <div
                key={item.id}
                className="flex flex-col items-center justify-center w-24 h-24 p-2 hover:bg-white/10 rounded cursor-pointer group"
                onClick={(e) => {
                  e.stopPropagation();
                  handleItemClick(item);
                }}
              >
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 mb-2"
                />
                {editingItemId === item.id ? (
                  <input
                    type="text"
                    value={item.name}
                    className="bg-black/50 text-white px-2 py-1 rounded w-full text-center text-xs"
                    onChange={(e) =>
                      handleItemNameChange(item.id, e.target.value)
                    }
                    onBlur={() => setEditingItemId(null)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleItemNameChange(item.id, e.currentTarget.value);
                        setEditingItemId(null);
                      }
                    }}
                    autoFocus
                  />
                ) : (
                  <span
                    className="text-xs text-white text-center px-2 py-1 rounded group-hover:bg-blue-500/30 w-full truncate"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingItemId(item.id);
                    }}
                  >
                    {item.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={closeContextMenu}
          onCreateFolder={createNewFolder}
          onRefresh={() => {}}
          onPersonalize={() => {}}
        />
      )}

      {/* Open Applications */}
      {openApp === "filemanager" && (
        <FileManager
          onClose={() => {
            setOpenApp(null);
            setCurrentPath(null);
          }}
          isMaximized={isMaximized}
          onMaximize={() => setIsMaximized(!isMaximized)}
          onMinimize={() => {}}
          initialPath={currentPath}
          isRecycleBin={currentPath === "Recycle Bin"}
        />
      )}
      {openApp === "chrome" && (
        <Chrome
          onClose={() => setOpenApp(null)}
          isMaximized={isMaximized}
          onMaximize={() => setIsMaximized(!isMaximized)}
          onMinimize={() => {}}
        />
      )}
      {openApp === "vscode" && (
        <VSCode
          onClose={() => setOpenApp(null)}
          isMaximized={isMaximized}
          onMaximize={() => setIsMaximized(!isMaximized)}
          onMinimize={() => {}}
        />
      )}
      {openApp === "word" && (
        <Word
          onClose={() => setOpenApp(null)}
          isMaximized={isMaximized}
          onMaximize={() => setIsMaximized(!isMaximized)}
          onMinimize={() => {}}
        />
      )}

      {/* Image Viewer */}
      {openImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={() => setOpenImage(null)}
        >
          <div className="bg-white p-4 rounded-lg">
            <Image
              src={`/images/${openImage}`}
              alt={openImage}
              width={800}
              height={600}
              objectFit="contain"
            />
          </div>
        </div>
      )}

      {/* Start Menu */}
      {isStartMenuOpen && (
        <StartMenu
          onClose={() => setIsStartMenuOpen(false)}
          onOpenApp={handleOpenApp}
        />
      )}

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-black/70 backdrop-blur-lg flex items-center justify-center px-2 text-white">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleStartClick();
          }}
          className="p-2 hover:bg-white/10 rounded-md transition-colors"
        >
          <Image src="/images/windows.png" alt="Start" width={24} height={24} />
        </button>

        {/* Task bar icons */}
        <div className="flex items-center space-x-1 ml-2">
          {taskbarIcons.map((icon) => (
            <button
              key={icon.name}
              onClick={(e) => {
                e.stopPropagation();
                handleTaskbarIconClick(icon.action);
              }}
              className="p-2 hover:bg-white/10 rounded-md transition-colors"
            >
              {typeof icon.icon === "string" ? (
                <Image src={icon.icon} alt={icon.name} width={20} height={20} />
              ) : (
                icon.icon
              )}
            </button>
          ))}
        </div>

        {/* System Tray */}
        <div className="absolute right-2 flex items-center space-x-2">
          <button className="p-2 hover:bg-white/10 rounded-md">
            <ChevronUp className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-md">
            <Wifi className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-md">
            <Volume2 className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-md">
            <Battery className="w-4 h-4" />
          </button>
          <div className="px-3 py-1 hover:bg-white/10 rounded-md text-xs">
            <div>
              {currentTime.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </div>
            <div>
              {currentTime.toLocaleDateString("en-US", {
                month: "numeric",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
