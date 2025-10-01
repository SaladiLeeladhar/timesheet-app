"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

const DUMMY_EMAIL = "user@ticktock.com";
const DUMMY_PASSWORD = "password123";

const Login: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (email === DUMMY_EMAIL && password === DUMMY_PASSWORD) {
      const dummyToken = "dummy-auth-token-12345";
      if (rememberMe) {
        localStorage.setItem("authToken", dummyToken);
      } else {
        sessionStorage.setItem("authToken", dummyToken);
      }
      router.push("/dashboard");
    } else {
      setError("Invalid email or password. (Hint: user@ticktock.com / password123)");
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-1/2 flex flex-col p-10 sm:p-16 xl:p-24 bg-white">
        <h1 className="text-xl font-semibold text-black">Login</h1>
        <div className="flex flex-col justify-center flex-grow py-10">
          <div className="max-w-md w-full mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-black">Welcome back</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <input
                id="email"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-black px-3 py-3 border rounded-md shadow-sm"
              />
              <input
                id="password"
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-black px-3 py-3 border rounded-md shadow-sm"
              />

              <div className="flex items-center space-x-2">
                <input
                  id="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="text-sm text-gray-700">
                  Remember Me
                </label>
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex w-1/2 bg-blue-600 items-center justify-center p-24">
        <div className="text-white">
          <h2 className="text-6xl font-bold mb-8">ticktock</h2>
          <p className="text-xl leading-relaxed">
            Track and monitor employee productivity with <b>ticktock</b>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
