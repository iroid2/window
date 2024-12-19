"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onCreateFolder: () => void;
  onRefresh: () => void;
  onPersonalize: () => void;
  onViewChange?: (view: string) => void;
  onSort?: (by: string) => void;
}

export default function ContextMenu({
  x,
  y,
  onClose,
  onCreateFolder,
  onRefresh,
  onPersonalize,
  onViewChange,
  onSort,
}: ContextMenuProps) {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const handleMouseEnter = (menu: string) => {
    setActiveSubmenu(menu);
  };

  const handleMouseLeave = () => {
    setActiveSubmenu(null);
  };

  const menuItems = [
    {
      label: "View",
      hasSubmenu: true,
      submenuId: "view",
    },
    {
      label: "Sort by",
      hasSubmenu: true,
      submenuId: "sort",
    },
    {
      label: "Refresh",
      hasSubmenu: false,
      onClick: onRefresh,
    },
    { type: "separator" },
    {
      label: "Paste",
      disabled: true,
    },
    {
      label: "Paste shortcut",
      disabled: true,
    },
    { type: "separator" },
    {
      label: "New",
      hasSubmenu: true,
      submenuId: "new",
    },
    { type: "separator" },
    {
      label: "Display settings",
      hasSubmenu: false,
    },
    {
      label: "Personalize",
      hasSubmenu: false,
      onClick: onPersonalize,
    },
  ];

  const viewSubmenuItems = [
    {
      label: "Large icons",
      shortcut: "Ctrl+Shift+2",
      onClick: () => onViewChange?.("large"),
    },
    {
      label: "Medium icons",
      shortcut: "Ctrl+Shift+3",
      onClick: () => onViewChange?.("medium"),
    },
    {
      label: "Small icons",
      shortcut: "Ctrl+Shift+4",
      onClick: () => onViewChange?.("small"),
    },
    { type: "separator" },
    {
      label: "Auto arrange icons",
      onClick: () => onViewChange?.("autoArrange"),
    },
    {
      label: "Align icons to grid",
      onClick: () => onViewChange?.("alignToGrid"),
    },
    {
      label: "Show desktop icons",
      onClick: () => onViewChange?.("showIcons"),
    },
  ];

  const sortSubmenuItems = [
    {
      label: "Name",
      onClick: () => onSort?.("name"),
    },
    {
      label: "Size",
      onClick: () => onSort?.("size"),
    },
    {
      label: "Date modified",
      onClick: () => onSort?.("dateModified"),
    },
  ];

  const newSubmenuItems = [
    {
      label: "Folder",
      onClick: onCreateFolder,
    },
    {
      label: "Shortcut",
      onClick: () => {},
    },
    {
      label: "Text Document",
      onClick: () => {},
    },
  ];

  const getSubmenuPosition = (submenuId: string) => {
    switch (submenuId) {
      case "view":
        return { top: y + 40, left: x + 250 };
      case "sort":
        return { top: y + 80, left: x + 250 };
      case "new":
        return { top: y + 200, left: x + 250 };
      default:
        return { top: y, left: x + 250 };
    }
  };

  return (
    <>
      <div
        className="fixed z-50 w-64 bg-[#2d2d2d] shadow-lg rounded-md py-2 text-white text-sm"
        style={{
          top: y,
          left: x,
          transform: `translate(${
            x + 264 > window.innerWidth ? "-100%" : "0"
          })`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {menuItems.map((item, index) =>
          item.type === "separator" ? (
            <div key={index} className="h-px bg-gray-600 my-2" />
          ) : (
            <button
              key={item.label}
              className={`w-full px-3 py-1.5 flex items-center justify-between hover:bg-blue-500 ${
                item.disabled
                  ? "opacity-50 cursor-not-allowed hover:bg-transparent"
                  : ""
              }`}
              onClick={() => {
                if (item.onClick) {
                  item.onClick();
                  onClose();
                }
              }}
              onMouseEnter={() =>
                item.submenuId && handleMouseEnter(item.submenuId)
              }
              disabled={item.disabled}
            >
              {item.label}
              {item.hasSubmenu && <ChevronRight className="w-4 h-4" />}
            </button>
          )
        )}
      </div>

      {/* View Submenu */}
      {activeSubmenu === "view" && (
        <div
          className="fixed z-50 w-64 bg-[#2d2d2d] shadow-lg rounded-md py-2 text-white text-sm"
          style={getSubmenuPosition("view")}
          onMouseEnter={() => handleMouseEnter("view")}
          onMouseLeave={handleMouseLeave}
        >
          {viewSubmenuItems.map((item, index) =>
            item.type === "separator" ? (
              <div key={index} className="h-px bg-gray-600 my-2" />
            ) : (
              <button
                key={item.label}
                className="w-full px-3 py-1.5 flex items-center justify-between hover:bg-blue-500"
                onClick={() => {
                  // @ts-ignore
                  item.onClick();
                  onClose();
                }}
              >
                <span>{item.label}</span>
                {item.shortcut && (
                  <span className="text-gray-400 text-xs">{item.shortcut}</span>
                )}
              </button>
            )
          )}
        </div>
      )}

      {/* Sort Submenu */}
      {activeSubmenu === "sort" && (
        <div
          className="fixed z-50 w-48 bg-[#2d2d2d] shadow-lg rounded-md py-2 text-white text-sm"
          style={getSubmenuPosition("sort")}
          onMouseEnter={() => handleMouseEnter("sort")}
          onMouseLeave={handleMouseLeave}
        >
          {sortSubmenuItems.map((item) => (
            <button
              key={item.label}
              className="w-full px-3 py-1.5 flex items-center hover:bg-blue-500"
              onClick={() => {
                item.onClick();
                onClose();
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* New Submenu */}
      {activeSubmenu === "new" && (
        <div
          className="fixed z-50 w-48 bg-[#2d2d2d] shadow-lg rounded-md py-2 text-white text-sm"
          style={getSubmenuPosition("new")}
          onMouseEnter={() => handleMouseEnter("new")}
          onMouseLeave={handleMouseLeave}
        >
          {newSubmenuItems.map((item) => (
            <button
              key={item.label}
              className="w-full px-3 py-1.5 flex items-center hover:bg-blue-500"
              onClick={() => {
                item.onClick();
                onClose();
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
