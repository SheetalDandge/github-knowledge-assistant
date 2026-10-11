import { useState } from "react";
import { GitBranch, Mail, Lock, ArrowRight } from "lucide-react";

function Login({ onLogin, onShowSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(event) {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    onLogin({
      name: email.split("@")[0],
      email,
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900">
            <GitBranch size={24} className="text-white" />
          </div>
        </div>

        <h1 className="mt-6 text-center text-2xl font-semibold text-gray-900">
          Welcome back
        </h1>

        <p className="mt-2 text-center text-sm text-gray-500">
          Login to GitHub Knowledge Assistant
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>

            <div className="flex items-center gap-3 rounded-lg border border-gray-200 px-3">
              <Mail size={18} className="text-gray-400" />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-11 flex-1 outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="flex items-center gap-3 rounded-lg border border-gray-200 px-3">
              <Lock size={18} className="text-gray-400" />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="h-11 flex-1 outline-none text-sm"
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-gray-900 text-sm font-medium text-white hover:bg-gray-700"
          >
            Login
            <ArrowRight size={16} />
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <button
            onClick={onShowSignup}
            className="font-medium text-gray-900 hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;