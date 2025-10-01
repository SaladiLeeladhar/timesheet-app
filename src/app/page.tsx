"use client";

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

const DUMMY_EMAIL: string = "user@ticktock.com";
const DUMMY_PASSWORD: string = "password123";

const Login: React.FC = () => {
  const router = useRouter(); 
  
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (email === DUMMY_EMAIL && password === DUMMY_PASSWORD) {
      console.log('Login successful! Navigating to /dashboard...');
      router.push('/dashboard'); 
    } else {
      console.log('Login failed.');
      setError('Invalid email or password. Hint: Try user@ticktock.com / password123');
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-1/2 flex flex-col p-10 sm:p-16 xl:p-24 bg-white">
        <header className="flex justify-between items-center w-full">
          <h1 className="text-xl font-semibold text-black">Login</h1>
          <div className="flex items-center justify-center w-8 h-8 bg-yellow-400 text-black">
             <span className="font-bold">&lt;/&gt;</span>
          </div>
        </header>
        <div className="flex flex-col justify-center flex-grow py-10">
          <div className="max-w-md w-full mx-auto">
            <h2 className="text-3xl font-bold mb-8">Welcome back</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="********"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              {error && (
                <p className="text-sm font-medium text-red-600 pt-1">{error}</p>
              )}
              <div className="pt-4 space-y-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex w-1/2 bg-blue-600 items-center justify-center p-24">
        <div className="text-white">
          <h2 className="text-6xl font-bold mb-8">ticktock</h2>
          <p className="text-xl leading-relaxed">
            Introducing **ticktock**, our cutting-edge timesheet web application designed to revolutionize how you manage employee work hours. With ticktock, you can effortlessly track and monitor employee attendance and productivity from anywhere, anytime, using any internet-connected device.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
