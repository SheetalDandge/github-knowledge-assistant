import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  FileCode2,
  FileText,
  Folder,
  GitBranch,
  GitCommit,
  History,
  Info,
  MessageSquare,
  Search,
  Send,
  Sparkles,
} from "lucide-react";

import { useTheme } from "./ThemeContext";

const sampleFiles = [
  {
    name: "README.md",
    path: "README.md",
    type: "file",
    content:
      "# Project README\n\nWelcome to your repository.\n\n## Getting Started\n\nSelect a file to explore its contents.",
  },
  {
    name: "App.jsx",
    path: "src/App.jsx",
    type: "file",
    content:
      'import React from "react";\n\nfunction App() {\n  return (\n    <main>\n      <h1>Welcome to my project</h1>\n    </main>\n  );\n}\n\nexport default App;',
  },
  {
    name: "main.jsx",
    path: "src/main.jsx",
    type: "file",
    content:
      'import { createRoot } from "react-dom/client";\nimport App from "./App.jsx";\n\ncreateRoot(document.getElementById("root")).render(\n  <App />\n);',
  },
  {
    name: "index.css",
    path: "src/index.css",
    type: "file",
    content:
      "body {\n  margin: 0;\n  font-family: Arial, sans-serif;\n}\n",
  },
  {
    name: "package.json",
    path: "package.json",
    type: "file",
    content:
      '{\n  "name": "my-project",\n  "version": "1.0.0",\n  "scripts": {\n    "dev": "vite"\n  }\n}',
  },
];

const commits = [
  {
    message: "Initial project setup",
    author: "Repository owner",
    date: "Sample commit",
    hash: "a1b2c3d",
  },
  {
    message: "Add application components",
    author: "Repository owner",
    date: "Sample commit",
    hash: "e4f5g6h",
  },
  {
    message: "Update project styles",
    author: "Repository owner",
    date: "Sample commit",
    hash: "i7j8k9l",
  },
];

function Repository() {
  const { darkMode } = useTheme();

  const [repository, setRepository] = useState(null);
  const [selectedFile, setSelectedFile] = useState(sampleFiles[0]);
  const [leftMode, setLeftMode] = useState("files");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [folderOpen, setFolderOpen] = useState(true);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("githubRepository");

      if (saved) {
        setRepository(JSON.parse(saved));
      }
    } catch {
      setRepository(null);
    }
  }, []);

  const filteredFiles = useMemo(
    () =>
      sampleFiles.filter((file) =>
        file.path.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  function sendMessage() {
    const question = message.trim();

    if (!question) return;

    setChatMessages((previous) => [
      ...previous,
      { role: "user", text: question },
      {
        role: "assistant",
        text: `This is the frontend preview. Once the AI backend is connected, I will analyze ${selectedFile.path} and answer: "${question}"`,
      },
    ]);

    setMessage("");
  }

  if (!repository) {
    return (
      <div
        className={`flex min-h-screen items-center justify-center p-6 ${
          darkMode ? "bg-[#111111]" : "bg-white"
        }`}
      >
        <div className="max-w-md text-center">
          <GitBranch
            size={35}
            className={`mx-auto ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          />

          <h1
            className={`mt-4 text-xl font-semibold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            No repository selected
          </h1>

          <p
            className={`mt-2 text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Return to the home page and enter a GitHub repository URL.
          </p>

          <button
            onClick={() => (window.location.href = "/")}
            className={`mt-5 rounded-lg px-4 py-2 text-sm ${
              darkMode
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-gray-900 text-white hover:bg-black"
            }`}
          >
            Back to home
          </button>
        </div>
      </div>
    );
  }

  const repositoryName = `${repository.owner}/${repository.repo}`;

  return (
    <div
      className={`flex h-screen overflow-hidden ${
        darkMode
          ? "bg-[#111111] text-gray-200"
          : "bg-white text-gray-800"
      }`}
    >
      {/* Repository workspace */}
      <main className="flex min-w-0 flex-1 flex-col">
        {/* Top header */}
        <header
          className={`flex h-[58px] shrink-0 items-center justify-between gap-3 border-b px-4 sm:px-6 ${
            darkMode
              ? "border-gray-800 bg-[#151515]"
              : "border-gray-200 bg-white"
          }`}
        >
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => (window.location.href = "/")}
              className={`rounded-md p-2 ${
                darkMode
                  ? "text-gray-400 hover:bg-[#252525] hover:text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
              title="Back to dashboard"
            >
              <ArrowLeft size={17} />
            </button>

            <div className="min-w-0">
              <p
                className={`truncate text-sm font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {repositoryName}
              </p>

              <p
                className={`text-xs ${
                  darkMode ? "text-gray-500" : "text-gray-500"
                }`}
              >
                Repository workspace
              </p>
            </div>
          </div>

          <a
            href={repository.url}
            target="_blank"
            rel="noreferrer"
            className={`flex shrink-0 items-center gap-2 rounded-md border px-3 py-2 text-xs font-medium ${
              darkMode
                ? "border-gray-700 text-gray-300 hover:bg-[#252525]"
                : "border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span className="hidden sm:inline">View on GitHub</span>
            <ExternalLink size={14} />
          </a>
        </header>

        {/* Three-panel layout */}
        <div className="flex min-h-0 flex-1">
          {/* LEFT: File explorer */}
          <aside
            className={`flex w-[210px] shrink-0 flex-col border-r sm:w-[245px] ${
              darkMode
                ? "border-gray-800 bg-[#181818]"
                : "border-gray-200 bg-[#fafaf9]"
            }`}
          >
            <div
              className={`border-b p-3 ${
                darkMode ? "border-gray-800" : "border-gray-200"
              }`}
            >
              <p
                className={`mb-3 px-1 text-[10px] font-semibold tracking-[1.5px] ${
                  darkMode ? "text-gray-500" : "text-gray-400"
                }`}
              >
                REPOSITORY
              </p>

              {[
                { id: "files", label: "Explorer", icon: Folder },
                { id: "search", label: "Code Search", icon: Search },
                { id: "commits", label: "Commit History", icon: History },
                { id: "overview", label: "Overview", icon: Info },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setLeftMode(id)}
                  className={`mb-1 flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm ${
                    leftMode === id
                      ? darkMode
                        ? "bg-[#303030] font-medium text-white"
                        : "bg-[#e9e9e7] font-medium text-gray-900"
                      : darkMode
                      ? "text-gray-400 hover:bg-[#252525]"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}
            </div>

            {(leftMode === "files" || leftMode === "search") && (
              <div className="min-h-0 flex-1 overflow-y-auto p-3">
                <div className="mb-3 flex items-center justify-between">
                  <p
                    className={`text-[10px] font-semibold tracking-[1.3px] ${
                      darkMode ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    {leftMode === "files" ? "FILES" : "SEARCH FILES"}
                  </p>

                  <button
                    onClick={() => setLeftMode("search")}
                    className={`rounded p-1 ${
                      darkMode
                        ? "text-gray-500 hover:bg-[#292929]"
                        : "text-gray-400 hover:bg-gray-200"
                    }`}
                    title="Search files"
                  >
                    <Search size={15} />
                  </button>
                </div>

                {leftMode === "search" && (
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Find a file..."
                    className={`mb-3 w-full rounded-md border px-3 py-2 text-xs outline-none ${
                      darkMode
                        ? "border-gray-700 bg-[#222222] text-white placeholder:text-gray-600 focus:border-gray-500"
                        : "border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-gray-400"
                    }`}
                  />
                )}

                {leftMode === "files" && (
                  <button
                    onClick={() => setFolderOpen(!folderOpen)}
                    className={`mb-2 flex items-center gap-1 text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {folderOpen ? (
                      <ChevronDown size={15} />
                    ) : (
                      <ChevronRight size={15} />
                    )}
                    <Folder size={15} />
                    {repository.repo}
                  </button>
                )}

                {(leftMode === "search" || folderOpen) &&
                  filteredFiles.map((file) => (
                    <button
                      key={file.path}
                      onClick={() => setSelectedFile(file)}
                      className={`mb-1 flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-xs ${
                        selectedFile.path === file.path
                          ? darkMode
                            ? "bg-[#303030] text-white"
                            : "bg-gray-200 text-gray-900"
                          : darkMode
                          ? "text-gray-400 hover:bg-[#252525]"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {file.name.endsWith(".md") ? (
                        <FileText size={15} className="shrink-0" />
                      ) : (
                        <FileCode2 size={15} className="shrink-0" />
                      )}

                      <span className="truncate">{file.path}</span>
                    </button>
                  ))}

                {leftMode === "search" &&
                  filteredFiles.length === 0 && (
                    <p
                      className={`px-2 py-3 text-xs ${
                        darkMode ? "text-gray-500" : "text-gray-500"
                      }`}
                    >
                      No matching files.
                    </p>
                  )}
              </div>
            )}

            <div
              className={`border-t p-3 ${
                darkMode ? "border-gray-800" : "border-gray-200"
              }`}
            >
              <div
                className={`flex items-center gap-2 text-xs ${
                  darkMode ? "text-gray-500" : "text-gray-500"
                }`}
              >
                <GitBranch size={14} />
                Repository workspace
              </div>
            </div>
          </aside>

          {/* CENTER */}
          <section
            className={`flex min-w-0 flex-1 flex-col ${
              darkMode ? "bg-[#111111]" : "bg-white"
            }`}
          >
            <div
              className={`flex h-[43px] shrink-0 items-center justify-between border-b px-4 ${
                darkMode
                  ? "border-gray-800 bg-[#181818]"
                  : "border-gray-200 bg-[#fafaf9]"
              }`}
            >
              <div className="flex min-w-0 items-center gap-2">
                <FileCode2
                  size={15}
                  className={
                    darkMode ? "shrink-0 text-gray-500" : "shrink-0 text-gray-500"
                  }
                />

                <span
                  className={`truncate text-xs font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {leftMode === "commits"
                    ? "Commit History"
                    : leftMode === "overview"
                    ? "Repository Overview"
                    : leftMode === "search"
                    ? "Code Search"
                    : selectedFile.path}
                </span>
              </div>

              {leftMode === "files" && (
                <span
                  className={`text-[10px] ${
                    darkMode ? "text-gray-600" : "text-gray-400"
                  }`}
                >
                  Preview
                </span>
              )}
            </div>

            <div className="min-h-0 flex-1 overflow-auto">
              {/* FILES */}
              {leftMode === "files" && (
                <div className="min-h-full">
                  <div
                    className={`border-b px-4 py-3 text-xs ${
                      darkMode
                        ? "border-gray-800 text-gray-500"
                        : "border-gray-100 text-gray-500"
                    }`}
                  >
                    {selectedFile.path}
                  </div>

                  <div
                    className={`overflow-x-auto py-3 font-mono text-[12px] leading-7 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {selectedFile.content
                      .split("\n")
                      .map((line, index) => (
                        <div
                          key={index}
                          className={`flex min-w-max ${
                            darkMode
                              ? "hover:bg-[#181818]"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <span
                            className={`w-12 shrink-0 select-none pr-4 text-right ${
                              darkMode
                                ? "text-gray-700"
                                : "text-gray-300"
                            }`}
                          >
                            {index + 1}
                          </span>

                          <pre
                            className={`whitespace-pre pr-6 ${
                              darkMode
                                ? "text-gray-300"
                                : "text-gray-700"
                            }`}
                          >
                            {line || " "}
                          </pre>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* SEARCH */}
              {leftMode === "search" && (
                <div className="p-5">
                  <h2
                    className={`text-lg font-semibold ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Search code
                  </h2>

                  <p
                    className={`mt-2 text-sm ${
                      darkMode ? "text-gray-500" : "text-gray-500"
                    }`}
                  >
                    Search filenames in this UI preview.
                  </p>

                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Enter a filename..."
                    className={`mt-5 h-10 w-full rounded-lg border px-3 text-sm outline-none ${
                      darkMode
                        ? "border-gray-700 bg-[#222222] text-white placeholder:text-gray-600 focus:border-gray-500"
                        : "border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-gray-400"
                    }`}
                  />

                  <div className="mt-4 space-y-1">
                    {filteredFiles.map((file) => (
                      <button
                        key={file.path}
                        onClick={() => {
                          setSelectedFile(file);
                          setLeftMode("files");
                        }}
                        className={`flex w-full items-center gap-2 rounded-md p-3 text-left text-sm ${
                          darkMode
                            ? "hover:bg-[#252525]"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <FileCode2 size={16} />
                        {file.path}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* COMMITS */}
              {leftMode === "commits" && (
                <div className="p-5 sm:p-7">
                  <h2
                    className={`text-xl font-semibold ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Commit history
                  </h2>

                  <p
                    className={`mt-2 text-sm ${
                      darkMode ? "text-gray-500" : "text-gray-500"
                    }`}
                  >
                    Review changes made to the repository.
                  </p>

                  <div className="mt-6">
                    {commits.map((commit) => (
                      <div
                        key={commit.hash}
                        className={`flex gap-3 border-l pb-6 pl-4 ${
                          darkMode
                            ? "border-gray-700"
                            : "border-gray-200"
                        }`}
                      >
                        <GitCommit
                          size={17}
                          className={`-ml-[25px] shrink-0 ${
                            darkMode
                              ? "bg-[#111111] text-gray-500"
                              : "bg-white text-gray-500"
                          }`}
                        />

                        <div className="min-w-0">
                          <p
                            className={`text-sm font-medium ${
                              darkMode
                                ? "text-gray-200"
                                : "text-gray-900"
                            }`}
                          >
                            {commit.message}
                          </p>

                          <p
                            className={`mt-1 text-xs ${
                              darkMode
                                ? "text-gray-500"
                                : "text-gray-500"
                            }`}
                          >
                            {commit.author} · {commit.date}
                          </p>

                          <p
                            className={`mt-2 font-mono text-xs ${
                              darkMode
                                ? "text-gray-600"
                                : "text-gray-400"
                            }`}
                          >
                            {commit.hash}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p
                    className={`text-xs ${
                      darkMode ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    Example commits only; live history is not connected.
                  </p>
                </div>
              )}

              {/* OVERVIEW */}
              {leftMode === "overview" && (
                <div className="p-5 sm:p-7">
                  <div className="flex items-center gap-3">
                    <div
                      className={`rounded-xl p-3 ${
                        darkMode ? "bg-[#292929]" : "bg-gray-100"
                      }`}
                    >
                      <BookOpen size={23} />
                    </div>

                    <div className="min-w-0">
                      <h2
                        className={`break-all text-xl font-semibold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {repository.repo}
                      </h2>

                      <p
                        className={`mt-1 text-sm ${
                          darkMode ? "text-gray-500" : "text-gray-500"
                        }`}
                      >
                        {repository.owner}
                      </p>
                    </div>
                  </div>

                  <p
                    className={`mt-5 break-all text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {repository.url}
                  </p>

                  <a
                    href={repository.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`mt-5 inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm ${
                      darkMode
                        ? "border-gray-700 text-gray-300 hover:bg-[#252525]"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    Open on GitHub <ExternalLink size={14} />
                  </a>

                  <h3
                    className={`mt-8 text-sm font-semibold ${
                      darkMode ? "text-gray-200" : "text-gray-900"
                    }`}
                  >
                    Workspace information
                  </h3>

                  <div
                    className={`mt-3 divide-y rounded-lg border ${
                      darkMode
                        ? "divide-gray-800 border-gray-700"
                        : "divide-gray-100 border-gray-200"
                    }`}
                  >
                    <div className="flex justify-between gap-3 p-3 text-sm">
                      <span
                        className={
                          darkMode ? "text-gray-500" : "text-gray-500"
                        }
                      >
                        Repository owner
                      </span>
                      <span className="break-all">
                        {repository.owner}
                      </span>
                    </div>

                    <div className="flex justify-between gap-3 p-3 text-sm">
                      <span
                        className={
                          darkMode ? "text-gray-500" : "text-gray-500"
                        }
                      >
                        Files in preview
                      </span>
                      <span>{sampleFiles.length}</span>
                    </div>

                    <div className="flex justify-between gap-3 p-3 text-sm">
                      <span
                        className={
                          darkMode ? "text-gray-500" : "text-gray-500"
                        }
                      >
                        Data source
                      </span>
                      <span>Demo content</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* RIGHT: AI Assistant */}
          <aside
            className={`hidden w-[500px] shrink-0 flex-col border-l xl:flex ${
              darkMode
                ? "border-gray-800 bg-[#151515]"
                : "border-gray-200 bg-white"
            }`}
          >
            <div
              className={`flex h-[43px] shrink-0 items-center justify-between border-b px-4 ${
                darkMode
                  ? "border-gray-800"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <Sparkles size={16} />
                <span
                  className={`text-xs font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  AI Assistant
                </span>
              </div>

              <MessageSquare
                size={15}
                className={
                  darkMode ? "text-gray-600" : "text-gray-400"
                }
              />
            </div>

            <div
              className={`border-b px-4 py-3 ${
                darkMode ? "border-gray-800" : "border-gray-100"
              }`}
            >
              <p
                className={`truncate text-xs font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                {repository.repo}
              </p>

              <p
                className={`mt-1 text-[11px] ${
                  darkMode ? "text-gray-500" : "text-gray-500"
                }`}
              >
                Current file: {selectedFile.name}
              </p>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {chatMessages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div
                    className={`rounded-xl border p-3 ${
                      darkMode
                        ? "border-gray-700"
                        : "border-gray-200"
                    }`}
                  >
                    <Sparkles
                      size={22}
                      className={
                        darkMode
                          ? "text-gray-300"
                          : "text-gray-600"
                      }
                    />
                  </div>

                  <h3
                    className={`mt-4 text-sm font-semibold ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Ask about your code
                  </h3>

                  <p
                    className={`mt-2 text-xs leading-5 ${
                      darkMode ? "text-gray-500" : "text-gray-500"
                    }`}
                  >
                    Understand functions, explore code structure, or get help
                    finding bugs.
                  </p>

                  {[
                    "Explain this file",
                    "How is this project structured?",
                    "Help me find a bug",
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setMessage(suggestion)}
                      className={`mt-3 w-full rounded-lg border p-3 text-left text-xs ${
                        darkMode
                          ? "border-gray-700 text-gray-400 hover:bg-[#252525]"
                          : "border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              ) : (
                chatMessages.map((item, index) => (
                  <div
                    key={index}
                    className={`rounded-lg p-3 text-xs leading-5 ${
                      item.role === "user"
                        ? darkMode
                          ? "ml-5 bg-[#303030] text-gray-200"
                          : "ml-5 bg-gray-100 text-gray-800"
                        : darkMode
                        ? "mr-2 border border-gray-700 text-gray-400"
                        : "mr-2 border border-gray-200 text-gray-600"
                    }`}
                  >
                    <p
                      className={`mb-1 text-[10px] font-semibold uppercase tracking-wide ${
                        darkMode
                          ? "text-gray-600"
                          : "text-gray-400"
                      }`}
                    >
                      {item.role === "user"
                        ? "You"
                        : "Assistant preview"}
                    </p>

                    {item.text}
                  </div>
                ))
              )}
            </div>

            <div
              className={`border-t p-3 ${
                darkMode ? "border-gray-800" : "border-gray-200"
              }`}
            >
              <div
                className={`rounded-xl border p-2 focus-within:border-gray-500 ${
                  darkMode
                    ? "border-gray-700 bg-[#202020]"
                    : "border-gray-200"
                }`}
              >
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" &&
                      !event.shiftKey
                    ) {
                      event.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Ask about this code..."
                  rows={3}
                  className={`w-full resize-none bg-transparent p-1 text-xs outline-none ${
                    darkMode
                      ? "text-white placeholder:text-gray-600"
                      : "text-gray-900 placeholder:text-gray-400"
                  }`}
                />

                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] ${
                      darkMode ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    Enter to send
                  </span>

                  <button
                    onClick={sendMessage}
                    disabled={!message.trim()}
                    className={`rounded-md p-2 ${
                      darkMode
                        ? "bg-white text-black hover:bg-gray-200"
                        : "bg-gray-900 text-white hover:bg-gray-700"
                    } disabled:cursor-not-allowed disabled:opacity-40`}
                    title="Send message"
                  >
                    <Send size={14} />
                  </button>
                </div>
              </div>

              <p
                className={`mt-2 text-center text-[10px] ${
                  darkMode ? "text-gray-600" : "text-gray-400"
                }`}
              >
                AI answers will work after backend integration.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default Repository;