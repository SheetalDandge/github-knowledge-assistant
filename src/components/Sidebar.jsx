import {
  Search,
  LayoutGrid,
  FolderGit2,
  Code2,
  MessageSquare,
  Bookmark,
  History,
  Settings,
  Plus,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";

import { useTheme } from "../ThemeContext";

function Sidebar({ user, onLogout }) {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <aside
      className={`flex h-screen w-[312px] shrink-0 flex-col overflow-hidden border-r px-5 py-6 ${
        darkMode
          ? "border-gray-700 bg-[#171717] text-gray-200"
          : "border-gray-200 bg-[#fafaf9] text-gray-900"
      }`}
    >
      {/* Logo */}
      <div className="flex shrink-0 items-center gap-3 px-2">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
            darkMode ? "bg-white" : "bg-[#242424]"
          }`}
        >
          <span
            className={`text-lg font-bold ${
              darkMode ? "text-black" : "text-white"
            }`}
          >
            GH
          </span>
        </div>

        <div className="min-w-0">
          <h1
            className={`text-[15px] font-semibold leading-5 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            GitHub Knowledge
          </h1>

          <h1
            className={`text-[15px] font-semibold leading-5 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Assistant
          </h1>

          <p
            className={`mt-1 text-[9px] tracking-[3px] ${
              darkMode ? "text-gray-500" : "text-gray-400"
            }`}
          >
            AI CODE INTELLIGENCE
          </p>
        </div>
      </div>

      {/* Search */}
      <button
        className={`mt-7 flex h-10 w-full shrink-0 items-center justify-between rounded-md border px-3 text-sm ${
          darkMode
            ? "border-gray-700 bg-[#202020] text-gray-300"
            : "border-gray-200 bg-white text-gray-700"
        }`}
      >
        <div className="flex items-center gap-3">
          <Search size={17} />
          <span>Search</span>
        </div>

        <span
          className={`text-xs ${
            darkMode ? "text-gray-500" : "text-gray-400"
          }`}
        >
          ⌘ K
        </span>
      </button>

      {/* Main Navigation */}
      <nav className="mt-5 shrink-0 space-y-1">
        {/* Dashboard */}
        <button
          onClick={() => {
            window.location.href = "/";
          }}
          className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium ${
            darkMode
              ? "bg-[#303030] text-white"
              : "bg-[#e9e9e7] text-gray-900"
          }`}
        >
          <LayoutGrid size={17} />
          <span>Dashboard</span>
        </button>

        {/* Repositories */}
        <button
          onClick={() => {
            window.location.href = "/repository";
          }}
          className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm ${
            darkMode
              ? "text-gray-400 hover:bg-[#252525]"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <FolderGit2 size={17} />
          <span>Repositories</span>
        </button>

        {/* Code Search */}
        <button
          onClick={() => {
            window.location.href = "/code-search";
          }}
          className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm ${
            darkMode
              ? "text-gray-400 hover:bg-[#252525]"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Code2 size={17} />
          <span>Code Search</span>
        </button>

        {/* AI Assistant */}
        <button
          onClick={() => {
            window.location.href = "/ai-assistant";
          }}
          className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm ${
            darkMode
              ? "text-gray-400 hover:bg-[#252525]"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <MessageSquare size={17} />
          <span>AI Assistant</span>
        </button>
      </nav>

      {/* Recent */}
      <div className="mt-7 shrink-0">
        <div className="flex items-center justify-between px-2">
          <p
            className={`text-[11px] font-medium tracking-[1.5px] ${
              darkMode ? "text-gray-500" : "text-gray-400"
            }`}
          >
            RECENT
          </p>

          <Plus
            size={16}
            className={darkMode ? "text-gray-500" : "text-gray-400"}
          />
        </div>

        <div className="mt-3 space-y-2.5">
          {[
            "SheetalDandge/autism-detection...",
            "github/.gitignore",
            "github/.gitignore",
          ].map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 px-2 text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <FolderGit2 size={16} />
              <span className="truncate">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Library */}
      <div className="mt-7 shrink-0">
        <p
          className={`px-2 text-[11px] font-medium tracking-[1.5px] ${
            darkMode ? "text-gray-500" : "text-gray-400"
          }`}
        >
          LIBRARY
        </p>

        <div className="mt-3 space-y-1">
          <button
            className={`flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm ${
              darkMode
                ? "text-gray-400 hover:bg-[#252525]"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Bookmark size={16} />
            <span>Saved Queries</span>
          </button>

          <button
            className={`flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm ${
              darkMode
                ? "text-gray-400 hover:bg-[#252525]"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <History size={16} />
            <span>History</span>
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div
        className={`mt-auto shrink-0 border-t pt-3 ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        {/* Settings */}
        <button
          className={`flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm ${
            darkMode
              ? "text-gray-400 hover:bg-[#252525]"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Settings size={17} />
          <span>Settings</span>
        </button>

        {/* Dark / Light Mode */}
        <button
          onClick={toggleDarkMode}
          className={`mt-2 flex w-full items-center justify-between rounded-md px-2 py-2 text-sm ${
            darkMode
              ? "text-gray-300 hover:bg-[#252525]"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <div className="flex items-center gap-3">
            {darkMode ? <Sun size={17} /> : <Moon size={17} />}

            <span>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </span>
          </div>

          <div
            className={`relative h-5 w-9 rounded-full transition ${
              darkMode ? "bg-white" : "bg-gray-300"
            }`}
          >
            <div
              className={`absolute top-0.5 h-4 w-4 rounded-full transition ${
                darkMode
                  ? "left-[18px] bg-black"
                  : "left-0.5 bg-white"
              }`}
            />
          </div>
        </button>

        {/* User Account */}
        <div className="mt-3 flex items-center gap-3 px-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div className="min-w-0 flex-1">
            <p
              className={`truncate text-sm font-semibold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {user?.name || "Developer"}
            </p>

            <p
              className={`truncate text-xs ${
                darkMode ? "text-gray-500" : "text-gray-400"
              }`}
            >
              {user?.email || "developer@example.com"}
            </p>
          </div>

          <button
            onClick={onLogout}
            title="Logout"
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${
              darkMode
                ? "text-gray-500 hover:bg-[#252525] hover:text-white"
                : "text-gray-400 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;