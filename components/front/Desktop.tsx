"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Search, Wifi, Volume2, Battery, ChevronUp } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import StartMenu from "./StartMenu";

import Word from "./word";
import Settings from "./settings";
import ContextMenu from "./ContextMenu";
import PersonalizationSettings from "./PersonalizationSettings";
import { Button } from "@/components/ui/button";
import FileManager from "./FileManager";
import Chrome from "./Chrome";
import VSCode from "./VSCode";
import Calculator from "./calculator";

interface DesktopFolder {
  id: string;
  name: string;
  createdAt: Date;
}

export default function Desktop() {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [openApp, setOpenApp] = useState<{
    name: string;
    isMaximized: boolean;
  } | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [folders, setFolders] = useState<DesktopFolder[]>([]);
  const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
  const [openSettings, setOpenSettings] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("/images/desk.jpg");
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      setContextMenu(null);
      setEditingFolderId(null);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setContextMenu(null);
        setEditingFolderId(null);
      }
    };

    window.addEventListener("click", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("click", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const createNewFolder = () => {
    const newFolder: DesktopFolder = {
      id: Date.now().toString(),
      name: "New Folder",
      createdAt: new Date(),
    };
    setFolders([...folders, newFolder]);
    setEditingFolderId(newFolder.id);
    setContextMenu(null);
  };

  const handleFolderNameChange = (id: string, newName: string) => {
    setFolders(
      folders.map((folder) =>
        folder.id === id ? { ...folder, name: newName } : folder
      )
    );
    setEditingFolderId(null);
  };

  const handleMaximize = () => {
    if (openApp) {
      setOpenApp({ ...openApp, isMaximized: true });
    }
  };

  const handleMinimize = () => {
    if (openApp) {
      setOpenApp({ ...openApp, isMaximized: false });
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handlePersonalize = () => {
    setOpenSettings(true);
    setContextMenu(null);
  };

  const handleChangeBackground = (imagePath: string) => {
    setBackgroundImage(imagePath);
  };

  const taskbarimages = [
    { name: "Search", icon: <Search className="w-5 h-5" />, action: () => {} },
    {
      name: "File Explorer",
      icon: "/images/file-explorer.png",
      action: () => handleOpenApp("File Explorer"),
    },
    {
      name: "Chrome",
      icon: "/images/chrome.png",
      action: () => handleOpenApp("Chrome"),
    },
    {
      name: "VS Code",
      icon: "/images/vscode.png",
      action: () => handleOpenApp("VS Code"),
    },
    {
      name: "Calculator",
      icon: "/images/calculator.png",
      action: () => handleOpenApp("Calculator"),
    },
    {
      name: "Word",
      icon: "/images/word.png",
      action: () => handleOpenApp("Word"),
    },
    {
      name: "Settings",
      icon: "/images/settings.png",
      action: () => handleOpenApp("Settings"),
    },
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
    switch (appName.toLowerCase()) {
      case "file explorer":
        setOpenApp({ name: "fileManager", isMaximized: false });
        break;
      case "chrome":
        setOpenApp({ name: "chrome", isMaximized: false });
        break;
      case "vs code":
        setOpenApp({ name: "vscode", isMaximized: false });
        break;
      case "calculator":
        setOpenApp({ name: "calculator", isMaximized: false });
        break;
      case "word":
        setOpenApp({ name: "word", isMaximized: false });
        break;
      case "settings":
        setOpenApp({ name: "settings", isMaximized: false });
        break;
      default:
        console.log(`Opening ${appName}`);
    }
  };

  return (
    <div
      className="h-screen w-screen overflow-hidden relative"
      onClick={() => {
        setIsStartMenuOpen(false);
        setContextMenu(null);
      }}
      onContextMenu={handleContextMenu}
    >
      {/* Desktop Background */}
      <Image
        src={backgroundImage}
        alt="Desktop Background"
        layout="fill"
        objectFit="cover"
        quality={100}
      />

      {/* Desktop Content */}
      <div className="absolute inset-0 p-4 grid grid-cols-6 gap-4 overflow-auto">
        {folders.map((folder) => (
          <div
            key={folder.id}
            className="flex flex-col items-center gap-2 p-2 hover:bg-white/10 rounded cursor-pointer group"
            onClick={(e) => e.stopPropagation()}
          >
            <img src="/images/folder.png" alt="Folder" className="h-12 w-12" />
            {editingFolderId === folder.id ? (
              <input
                type="text"
                value={folder.name}
                className="bg-black/50 text-white px-2 py-1 rounded w-full text-center"
                onChange={(e) =>
                  handleFolderNameChange(folder.id, e.target.value)
                }
                onBlur={() => setEditingFolderId(null)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleFolderNameChange(folder.id, e.currentTarget.value);
                  }
                }}
                autoFocus
              />
            ) : (
              <span className="text-sm text-white text-center px-2 py-1 rounded group-hover:bg-blue-500/30">
                {folder.name}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onCreateFolder={createNewFolder}
          onRefresh={handleRefresh}
          onPersonalize={handlePersonalize}
        />
      )}

      {/* Open Applications */}
      {openApp?.name === "fileManager" && (
        <FileManager
          onClose={() => setOpenApp(null)}
          isMaximized={openApp.isMaximized}
          onMaximize={handleMaximize}
          onMinimize={handleMinimize}
        />
      )}
      {openApp?.name === "chrome" && (
        <Chrome
          onClose={() => setOpenApp(null)}
          isMaximized={openApp.isMaximized}
          onMaximize={handleMaximize}
          onMinimize={handleMinimize}
        />
      )}
      {openApp?.name === "vscode" && (
        <VSCode
          onClose={() => setOpenApp(null)}
          isMaximized={openApp.isMaximized}
          onMaximize={handleMaximize}
          onMinimize={handleMinimize}
        />
      )}
      {openApp?.name === "calculator" && (
        <Calculator
          onClose={() => setOpenApp(null)}
          isMaximized={openApp.isMaximized}
          onMaximize={handleMaximize}
          onMinimize={handleMinimize}
        />
      )}
      {openApp?.name === "word" && (
        <Word
          onClose={() => setOpenApp(null)}
          isMaximized={openApp.isMaximized}
          onMaximize={handleMaximize}
          onMinimize={handleMinimize}
        />
      )}
      {openApp?.name === "settings" && (
        <Settings
          onClose={() => setOpenApp(null)}
          isMaximized={openApp.isMaximized}
          onMaximize={handleMaximize}
          onMinimize={handleMinimize}
        />
      )}

      {/* Personalization Settings */}
      {openSettings && (
        <PersonalizationSettings
          onClose={() => setOpenSettings(false)}
          isMaximized={false}
          onMaximize={() => {}}
          onMinimize={() => {}}
          onChangeBackground={handleChangeBackground}
        />
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
          {taskbarimages.map((icon) => (
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
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronUp className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Wifi className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Volume2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Battery className="w-4 h-4" />
          </Button>
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
