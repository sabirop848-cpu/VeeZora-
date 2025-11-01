import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Compass,
  Video,
  Users,
  Settings,
  Info,
  TrendingUp,
  Clock,
  ThumbsUp,
  Shield,
} from "lucide-react";
import { cn } from "../lib/utils";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Compass, label: "Explore", path: "/explore" },
    { icon: Users, label: "Subscriptions", path: "/subscriptions" },
    { icon: Video, label: "Upload", path: "/upload" },
  ];

  const secondaryItems = [
    { icon: TrendingUp, label: "Trending", path: "/explore?filter=trending" },
    { icon: Clock, label: "Watch Later", path: "/watch-later" },
    { icon: ThumbsUp, label: "Liked Videos", path: "/liked" },
  ];

  const bottomItems = [
    { icon: Settings, label: "Settings", path: "/settings" },
    { icon: Shield, label: "Admin", path: "/admin" },
    { icon: Info, label: "About", path: "/about" },
  ];

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-black/95 backdrop-blur-sm border-r border-purple-900/20 transition-all duration-300 overflow-y-auto scrollbar-hide z-40",
        isOpen ? "w-64" : "w-0"
      )}
    >
      {isOpen && (
        <div className="p-4 space-y-6">
          {/* Top Menu */}
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 group",
                  location.pathname === item.path
                    ? "bg-purple-900/30 text-purple-400"
                    : "hover:bg-purple-900/10 text-gray-300 hover:text-white"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5 transition-transform group-hover:scale-110",
                    location.pathname === item.path && "text-purple-400"
                  )}
                />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Secondary Menu */}
          <div className="border-t border-gray-800 pt-4">
            <h3 className="px-4 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Library
            </h3>
            <nav className="space-y-1">
              {secondaryItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 group",
                    location.pathname === item.path
                      ? "bg-purple-900/30 text-purple-400"
                      : "hover:bg-purple-900/10 text-gray-300 hover:text-white"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5 transition-transform group-hover:scale-110",
                      location.pathname === item.path && "text-purple-400"
                    )}
                  />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Bottom Menu */}
          <div className="border-t border-gray-800 pt-4">
            <nav className="space-y-1">
              {bottomItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 group",
                    location.pathname === item.path
                      ? "bg-purple-900/30 text-purple-400"
                      : "hover:bg-purple-900/10 text-gray-300 hover:text-white"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5 transition-transform group-hover:scale-110",
                      location.pathname === item.path && "text-purple-400"
                    )}
                  />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;