import { useState } from "react";
import {
  Search,
  ArrowLeft,
  Code2,
  FileCode2,
  FolderGit2,
} from "lucide-react";
import { useTheme } from "../ThemeContext";

function CodeSearch() {
  const { darkMode } = useTheme();

  const [search, setSearch] = useState("");

  const results = [
    {
      file: "src/auth/login.js",
      line: 24,
      code: "const user = await loginUser(email, password);",
    },
    {
      file: "src/components/Navbar.jsx",
      line: 18,
      code: "const user = getCurrentUser();",
    },
    {
      file: "src/services/api.js",
      line: 42,
      code: "const response = await fetch(API_URL);",
    },
  ];

  const filteredResults = results.filter((item) =>
    item.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className={`min-h-screen flex ${
        darkMode
          ? "bg-[#111111] text-white"
          : "bg-[#fafaf9] text-gray-900"
      }`}
    >
      {/* Sidebar */}
      <aside
        className={`w-[260px] min-h-screen border-r px-6 py-7 ${
          darkMode
            ? "bg-[#171717] border-gray-800"
            : "bg-[#fafaf9] border-gray-200"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              darkMode ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            <Code2 size={19} />
          </div>

          <div>
            <h1 className="font-semibold text-sm">
              GitHub Knowledge
            </h1>
            <p
              className={`text-xs ${
                darkMode ? "text-gray-500" : "text-gray-400"
              }`}
            >
              Assistant
            </p>
          </div>
        </div>

        {/* Back to Dashboard */}
        <button
          onClick={() => (window.location.href = "/")}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-3 transition ${
            darkMode
              ? "text-gray-400 hover:bg-gray-800 hover:text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <ArrowLeft size={18} />
          <span className="text-sm">Dashboard</span>
        </button>

        {/* Active Code Search */}
        <div
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${
            darkMode
              ? "bg-gray-800 text-white"
              : "bg-gray-100 text-gray-900"
          }`}
        >
          <Search size={18} />
          <span className="text-sm font-medium">Code Search</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-10 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">
            Code Search
          </h1>

          <p
            className={`mt-1 text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Search through your repository code.
          </p>
        </div>

        {/* Search Box */}
        <div className="max-w-3xl">
          <div
            className={`flex items-center gap-3 border rounded-xl px-4 py-3 ${
              darkMode
                ? "bg-[#181818] border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <Search
              size={20}
              className={darkMode ? "text-gray-500" : "text-gray-400"}
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search code, functions, variables..."
              className={`flex-1 bg-transparent outline-none text-sm ${
                darkMode
                  ? "text-white placeholder-gray-600"
                  : "text-gray-900 placeholder-gray-400"
              }`}
            />
          </div>
        </div>

        {/* Results */}
        <div className="max-w-4xl mt-8">
          {search ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold">
                  Search Results
                </h2>

                <span
                  className={`text-xs ${
                    darkMode ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  {filteredResults.length} results
                </span>
              </div>

              <div className="space-y-3">
                {filteredResults.length > 0 ? (
                  filteredResults.map((result, index) => (
                    <div
                      key={index}
                      className={`border rounded-xl p-4 ${
                        darkMode
                          ? "bg-[#181818] border-gray-800"
                          : "bg-white border-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <FileCode2
                          size={16}
                          className={
                            darkMode
                              ? "text-gray-400"
                              : "text-gray-500"
                          }
                        />

                        <span
                          className={`text-sm ${
                            darkMode
                              ? "text-gray-300"
                              : "text-gray-700"
                          }`}
                        >
                          {result.file}
                        </span>

                        <span
                          className={`text-xs ${
                            darkMode
                              ? "text-gray-600"
                              : "text-gray-400"
                          }`}
                        >
                          Line {result.line}
                        </span>
                      </div>

                      <div
                        className={`rounded-lg px-4 py-3 font-mono text-sm ${
                          darkMode
                            ? "bg-[#101010] text-gray-300"
                            : "bg-gray-50 text-gray-700"
                        }`}
                      >
                        {result.code}
                      </div>
                    </div>
                  ))
                ) : (
                  <div
                    className={`border rounded-xl p-10 text-center ${
                      darkMode
                        ? "border-gray-800"
                        : "border-gray-200"
                    }`}
                  >
                    <Search
                      size={30}
                      className={`mx-auto mb-3 ${
                        darkMode
                          ? "text-gray-600"
                          : "text-gray-300"
                      }`}
                    />

                    <p className="text-sm font-medium">
                      No results found
                    </p>

                    <p
                      className={`text-xs mt-1 ${
                        darkMode
                          ? "text-gray-500"
                          : "text-gray-400"
                      }`}
                    >
                      Try searching for another keyword.
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Empty State */}
              <div className="mt-12 text-center">
                <div
                  className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-5 ${
                    darkMode
                      ? "bg-gray-800"
                      : "bg-gray-100"
                  }`}
                >
                  <Search
                    size={25}
                    className={
                      darkMode
                        ? "text-gray-400"
                        : "text-gray-500"
                    }
                  />
                </div>

                <h2 className="font-semibold">
                  Search your codebase
                </h2>

                <p
                  className={`text-sm mt-2 ${
                    darkMode
                      ? "text-gray-500"
                      : "text-gray-400"
                  }`}
                >
                  Find functions, variables, files and code patterns
                  across your repository.
                </p>
              </div>

              {/* What can you search */}
              <div className="mt-12">
                <h2 className="text-sm font-semibold mb-4">
                  What can you search?
                </h2>

                <div className="grid grid-cols-3 gap-4">
                  <div
                    className={`border rounded-xl p-5 ${
                      darkMode
                        ? "bg-[#181818] border-gray-800"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <Code2 size={20} className="mb-3" />

                    <h3 className="text-sm font-medium">
                      Functions
                    </h3>

                    <p
                      className={`text-xs mt-1 ${
                        darkMode
                          ? "text-gray-500"
                          : "text-gray-400"
                      }`}
                    >
                      Find functions and methods.
                    </p>
                  </div>

                  <div
                    className={`border rounded-xl p-5 ${
                      darkMode
                        ? "bg-[#181818] border-gray-800"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <FileCode2 size={20} className="mb-3" />

                    <h3 className="text-sm font-medium">
                      Files
                    </h3>

                    <p
                      className={`text-xs mt-1 ${
                        darkMode
                          ? "text-gray-500"
                          : "text-gray-400"
                      }`}
                    >
                      Search specific files.
                    </p>
                  </div>

                  <div
                    className={`border rounded-xl p-5 ${
                      darkMode
                        ? "bg-[#181818] border-gray-800"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <FolderGit2 size={20} className="mb-3" />

                    <h3 className="text-sm font-medium">
                      Code
                    </h3>

                    <p
                      className={`text-xs mt-1 ${
                        darkMode
                          ? "text-gray-500"
                          : "text-gray-400"
                      }`}
                    >
                      Find code patterns.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default CodeSearch;