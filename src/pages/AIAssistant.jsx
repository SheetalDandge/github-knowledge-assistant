import { useState } from "react";
import {
  ArrowLeft,
  Bot,
  Plus,
  Search,
  Send,
  Sun,
  Moon,
  MessageSquare,
} from "lucide-react";
import { useTheme } from "../ThemeContext";

function AIAssistant() {
  const { darkMode, toggleDarkMode } = useTheme();

  const [activeChat, setActiveChat] = useState("Explain authentication");
  const [message, setMessage] = useState("");
  const [searchChat, setSearchChat] = useState("");

  const chats = {
    Today: [
      "Explain authentication",
      "How does API work?",
      "Explain project structure",
    ],
    Yesterday: [
      "Find database code",
      "Fix login error",
    ],
    Older: [
      "Repository overview",
    ],
  };

  const suggestions = [
    "Explain this repository",
    "How does authentication work?",
    "Find the database connection",
    "Explain the project structure",
  ];

  function sendMessage() {
    if (!message.trim()) return;

    setMessage("");
  }

  const filteredChats = Object.entries(chats).map(
    ([section, items]) => ({
      section,
      items: items.filter((chat) =>
        chat.toLowerCase().includes(searchChat.toLowerCase())
      ),
    })
  );

  return (
    <div
      className={`h-screen flex overflow-hidden ${
        darkMode
          ? "bg-[#111111] text-white"
          : "bg-[#fafaf9] text-gray-900"
      }`}
    >
      {/* Chat History Sidebar */}
      <aside
        className={`w-[300px] flex flex-col border-r ${
          darkMode
            ? "bg-[#171717] border-gray-800"
            : "bg-white border-gray-200"
        }`}
      >
        {/* Top */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  darkMode
                    ? "bg-white text-black"
                    : "bg-black text-white"
                }`}
              >
                <Bot size={19} />
              </div>

              <div>
                <h1 className="font-semibold text-sm">
                  AI Assistant
                </h1>

                <p
                  className={`text-xs ${
                    darkMode
                      ? "text-gray-500"
                      : "text-gray-400"
                  }`}
                >
                  Codebase companion
                </p>
              </div>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                darkMode
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              title={
                darkMode
                  ? "Switch to Light Mode"
                  : "Switch to Dark Mode"
              }
            >
              {darkMode ? (
                <Sun size={17} />
              ) : (
                <Moon size={17} />
              )}
            </button>
          </div>

          {/* New Chat */}
          <button
            onClick={() => setActiveChat("New conversation")}
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium ${
              darkMode
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            <Plus size={17} />
            New chat
          </button>

          {/* Search Chats */}
          <div
            className={`mt-4 flex items-center gap-2 px-3 py-2.5 rounded-lg border ${
              darkMode
                ? "bg-[#111111] border-gray-800"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <Search
              size={16}
              className={
                darkMode
                  ? "text-gray-500"
                  : "text-gray-400"
              }
            />

            <input
              value={searchChat}
              onChange={(e) => setSearchChat(e.target.value)}
              placeholder="Search chats"
              className={`w-full bg-transparent outline-none text-sm ${
                darkMode
                  ? "text-white placeholder-gray-600"
                  : "text-gray-800 placeholder-gray-400"
              }`}
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto px-3 pb-5">
          {filteredChats.map(({ section, items }) => {
            if (items.length === 0) return null;

            return (
              <div key={section} className="mb-6">
                <p
                  className={`px-2 mb-2 text-[11px] font-semibold uppercase tracking-wide ${
                    darkMode
                      ? "text-gray-600"
                      : "text-gray-400"
                  }`}
                >
                  {section}
                </p>

                <div className="space-y-1">
                  {items.map((chat) => (
                    <button
                      key={chat}
                      onClick={() => setActiveChat(chat)}
                      className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                        activeChat === chat
                          ? darkMode
                            ? "bg-gray-800 text-white"
                            : "bg-gray-100 text-gray-900"
                          : darkMode
                          ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <MessageSquare
                        size={15}
                        className="shrink-0"
                      />

                      <span className="truncate">
                        {chat}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom */}
        <div
          className={`border-t p-4 ${
            darkMode
              ? "border-gray-800"
              : "border-gray-200"
          }`}
        >
          <button
            onClick={() => (window.location.href = "/")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${
              darkMode
                ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </button>
        </div>
      </aside>

      {/* Main Chat */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header
          className={`h-[72px] border-b flex items-center px-8 ${
            darkMode
              ? "border-gray-800 bg-[#111111]"
              : "border-gray-200 bg-white"
          }`}
        >
          <div>
            <h2 className="font-semibold text-base">
              {activeChat}
            </h2>

            <p
              className={`text-xs mt-0.5 ${
                darkMode
                  ? "text-gray-500"
                  : "text-gray-400"
              }`}
            >
              Ask questions about your codebase
            </p>
          </div>
        </header>

        {/* Conversation */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-8 py-10">
            {/* AI Welcome */}
            <div className="flex gap-4">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  darkMode
                    ? "bg-gray-800"
                    : "bg-gray-100"
                }`}
              >
                <Bot size={19} />
              </div>

              <div className="max-w-2xl">
                <h3 className="font-semibold text-sm mb-2">
                  GitHub Knowledge Assistant
                </h3>

                <p
                  className={`text-sm leading-6 ${
                    darkMode
                      ? "text-gray-400"
                      : "text-gray-600"
                  }`}
                >
                  I can help you understand your repository,
                  explain code, find files, understand project
                  structure, and answer questions about your
                  codebase.
                </p>
              </div>
            </div>

            {/* Demo response */}
            {activeChat !== "New conversation" && (
              <div className="mt-10 flex gap-4">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    darkMode
                      ? "bg-gray-800"
                      : "bg-gray-100"
                  }`}
                >
                  <Bot size={19} />
                </div>

                <div className="max-w-2xl">
                  <p
                    className={`text-sm leading-6 ${
                      darkMode
                        ? "text-gray-300"
                        : "text-gray-700"
                    }`}
                  >
                    This is a demo conversation. Once the AI
                    backend is connected, I will analyze your
                    actual GitHub repository and provide
                    code-based answers.
                  </p>
                </div>
              </div>
            )}

            {/* Suggestions */}
            <div className="mt-12">
              <p
                className={`text-xs font-medium mb-4 ${
                  darkMode
                    ? "text-gray-500"
                    : "text-gray-400"
                }`}
              >
                TRY ASKING
              </p>

              <div className="grid grid-cols-2 gap-3">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setMessage(suggestion)}
                    className={`text-left px-4 py-3 rounded-xl border text-sm transition ${
                      darkMode
                        ? "bg-[#171717] border-gray-800 text-gray-300 hover:bg-gray-800"
                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Input */}
        <div
          className={`border-t px-8 py-5 ${
            darkMode
              ? "border-gray-800 bg-[#111111]"
              : "border-gray-200 bg-white"
          }`}
        >
          <div className="max-w-3xl mx-auto">
            <div
              className={`flex items-end gap-3 border rounded-xl px-4 py-3 ${
                darkMode
                  ? "bg-[#181818] border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                rows={1}
                placeholder="Ask about your code..."
                className={`flex-1 resize-none bg-transparent outline-none text-sm ${
                  darkMode
                    ? "text-white placeholder-gray-600"
                    : "text-gray-800 placeholder-gray-400"
                }`}
              />

              <button
                onClick={sendMessage}
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                  darkMode
                    ? "bg-white text-black hover:bg-gray-200"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                <Send size={16} />
              </button>
            </div>

            <p
              className={`text-[11px] text-center mt-3 ${
                darkMode
                  ? "text-gray-600"
                  : "text-gray-400"
              }`}
            >
              AI Assistant is currently running in demo mode.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AIAssistant;