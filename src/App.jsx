import { useState } from "react";
import {
  GitBranch,
  ArrowRight,
  Link2,
  AlertCircle,
} from "lucide-react";

import Sidebar from "./components/Sidebar";
import Repository from "./Repository";
import CodeSearch from "./pages/CodeSearch";
import AIAssistant from "./pages/AIAssistant";
import { useTheme } from "./ThemeContext";

function App() {
  const { darkMode } = useTheme();

  const [user] = useState({
    name: "Developer",
    email: "developer@example.com",
  });

  const [repoUrl, setRepoUrl] = useState("");
  const [error, setError] = useState("");

  if (window.location.pathname === "/repository") {
    return <Repository />;
  }

  if (window.location.pathname === "/code-search") {
    return <CodeSearch />;
  }

  if (window.location.pathname === "/ai-assistant") {
    return <AIAssistant />;
  }

  function handleProceed() {
    setError("");

    const url = repoUrl.trim();
    let parsedUrl;

    try {
      parsedUrl = new URL(
        /^https?:\/\//i.test(url)
          ? url
          : `https://${url}`
      );
    } catch {
      setError("Paste a valid GitHub repository URL.");
      return;
    }

    if (
      !["github.com", "www.github.com"].includes(
        parsedUrl.hostname.toLowerCase()
      )
    ) {
      setError("Please use a URL from github.com.");
      return;
    }

    const segments = parsedUrl.pathname
      .split("/")
      .filter(Boolean);

    if (segments.length < 2) {
      setError(
        "Use a repository link like https://github.com/owner/repository."
      );
      return;
    }

    const owner = segments[0];
    const repo = segments[1].replace(/\.git$/i, "");

    if (!owner || !repo) {
      setError("Please enter a valid repository URL.");
      return;
    }

    const cleanUrl = `https://github.com/${owner}/${repo}`;

    sessionStorage.setItem(
      "githubRepository",
      JSON.stringify({
        owner,
        repo,
        url: cleanUrl,
      })
    );

    window.location.href = "/repository";
  }

  return (
    <div
      className={`flex h-screen overflow-hidden ${
        darkMode
          ? "bg-[#111111] text-gray-200"
          : "bg-white text-gray-900"
      }`}
    >
      <Sidebar user={user} onLogout={() => {}} />

      {/* Main Dashboard */}
      <main className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        {/* Header */}
        <header
          className={`flex h-[76px] shrink-0 items-center justify-between border-b px-10 ${
            darkMode
              ? "border-gray-800 bg-[#111111]"
              : "border-gray-200 bg-white"
          }`}
        >
          <div>
            <h2
              className={`text-xl font-semibold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              GitHub Knowledge Assistant
            </h2>

            <p
              className={`mt-1 text-sm ${
                darkMode ? "text-gray-500" : "text-gray-500"
              }`}
            >
              Your AI-powered codebase companion.
            </p>
          </div>
        </header>

        {/* Content */}
        <div className="mx-auto w-full max-w-5xl px-10 py-12">
          {/* Welcome */}
          <div className="mb-10">
            <p
              className={`text-sm font-medium ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              WELCOME BACK
            </p>

            <h1
              className={`mt-2 text-3xl font-semibold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Analyze a GitHub repository
            </h1>

            <p
              className={`mt-3 max-w-2xl text-sm leading-6 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Paste a public GitHub repository URL below to
              explore its files, search code, understand the
              project structure, and chat with an AI assistant.
            </p>
          </div>

          {/* Repository Card */}
          <section
            className={`rounded-xl border p-7 shadow-sm ${
              darkMode
                ? "border-gray-800 bg-[#181818]"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  darkMode ? "bg-[#292929]" : "bg-gray-100"
                }`}
              >
                <GitBranch
                  size={19}
                  className={
                    darkMode
                      ? "text-gray-300"
                      : "text-gray-700"
                  }
                />
              </div>

              <div>
                <h3
                  className={`text-base font-semibold ${
                    darkMode
                      ? "text-white"
                      : "text-gray-900"
                  }`}
                >
                  Connect Repository
                </h3>

                <p
                  className={`text-xs ${
                    darkMode
                      ? "text-gray-500"
                      : "text-gray-500"
                  }`}
                >
                  Enter your GitHub repository URL
                </p>
              </div>
            </div>

            {/* Input */}
            <div className="mt-7">
              <label
                className={`mb-2 block text-sm font-medium ${
                  darkMode
                    ? "text-gray-300"
                    : "text-gray-700"
                }`}
              >
                Repository URL
              </label>

              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Link2
                    size={17}
                    className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                      darkMode
                        ? "text-gray-500"
                        : "text-gray-400"
                    }`}
                  />

                  <input
                    value={repoUrl}
                    onChange={(e) =>
                      setRepoUrl(e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleProceed();
                      }
                    }}
                    placeholder="https://github.com/owner/repository"
                    className={`h-11 w-full rounded-lg border pl-10 pr-4 text-sm outline-none transition ${
                      darkMode
                        ? "border-gray-700 bg-[#222222] text-white placeholder:text-gray-600 focus:border-gray-500"
                        : "border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-gray-400"
                    }`}
                  />
                </div>

                <button
                  onClick={handleProceed}
                  className={`flex h-11 items-center gap-2 rounded-lg px-5 text-sm font-medium transition ${
                    darkMode
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-[#242424] text-white hover:bg-black"
                  }`}
                >
                  Proceed
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Error */}
              {error && (
                <div
                  className={`mt-3 flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm ${
                    darkMode
                      ? "border-red-900 bg-red-950/30 text-red-300"
                      : "border-red-200 bg-red-50 text-red-600"
                  }`}
                >
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              <p
                className={`mt-3 text-xs ${
                  darkMode
                    ? "text-gray-600"
                    : "text-gray-400"
                }`}
              >
                Example: https://github.com/facebook/react
              </p>
            </div>
          </section>

          {/* What happens next */}
          <section className="mt-8">
            <h3
              className={`text-sm font-semibold ${
                darkMode
                  ? "text-gray-200"
                  : "text-gray-800"
              }`}
            >
              What happens next?
            </h3>

            <div className="mt-4 grid grid-cols-3 gap-4">
              {[
                {
                  number: "01",
                  title: "Explore Files",
                  text: "Browse the repository structure and source files.",
                },
                {
                  number: "02",
                  title: "Search Code",
                  text: "Find functions, variables, APIs and other code instantly.",
                },
                {
                  number: "03",
                  title: "Ask AI",
                  text: "Ask questions about the codebase and get explanations.",
                },
              ].map((item) => (
                <div
                  key={item.number}
                  className={`rounded-xl border p-5 ${
                    darkMode
                      ? "border-gray-800 bg-[#181818]"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <span
                    className={`text-xs font-semibold ${
                      darkMode
                        ? "text-gray-600"
                        : "text-gray-400"
                    }`}
                  >
                    {item.number}
                  </span>

                  <h4
                    className={`mt-3 text-sm font-semibold ${
                      darkMode
                        ? "text-white"
                        : "text-gray-900"
                    }`}
                  >
                    {item.title}
                  </h4>

                  <p
                    className={`mt-2 text-xs leading-5 ${
                      darkMode
                        ? "text-gray-500"
                        : "text-gray-500"
                    }`}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;