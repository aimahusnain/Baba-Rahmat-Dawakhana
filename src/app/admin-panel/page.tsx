'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminPanel from "./AdminPanel";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";

const ADMIN_EMAIL = "admin@admin.com";
const ADMIN_PASSWORD = "UseInstantPassword";
const ADMIN_MEMORY_SENTENCE = "BABA";
const MAX_ATTEMPTS = 4;
const LOCKOUT_TIME = 2 * 60 * 1000; // 2 minutes in milliseconds

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [memorySentence, setMemorySentence] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [showInstantLogin, setShowInstantLogin] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const authStatus = localStorage.getItem("adminAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }

    const storedLockoutTime = localStorage.getItem("lockoutTime");
    const storedAttempts = localStorage.getItem("attempts");
    
    if (storedLockoutTime && storedAttempts) {
      const remainingTime = parseInt(storedLockoutTime) - Date.now();
      if (remainingTime > 0) {
        setIsLocked(true);
        setLockoutTime(remainingTime);
        setAttempts(parseInt(storedAttempts));
      } else {
        localStorage.removeItem("lockoutTime");
        localStorage.removeItem("attempts");
      }
    }
  }, []);

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (isLocked && lockoutTime > 0) {
      timer = setInterval(() => {
        setLockoutTime((prevTime) => {
          const newTime = prevTime - 1000;
          if (newTime <= 0) {
            clearInterval(timer);
            setIsLocked(false);
            setAttempts(0);
            localStorage.removeItem("lockoutTime");
            localStorage.removeItem("attempts");
            return 0;
          }
          localStorage.setItem("lockoutTime", (Date.now() + newTime).toString());
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isLocked, lockoutTime]);

  const handleFailedAttempt = () => {
    setAttempts((prevAttempts) => {
      const newAttempts = prevAttempts + 1;
      localStorage.setItem("attempts", newAttempts.toString());
      if (newAttempts >= MAX_ATTEMPTS) {
        setIsLocked(true);
        const newLockoutTime = LOCKOUT_TIME;
        setLockoutTime(newLockoutTime);
        localStorage.setItem("lockoutTime", (Date.now() + newLockoutTime).toString());
      }
      return newAttempts;
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (isLocked) return;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("adminAuthenticated", "true");
      setError("");
      localStorage.removeItem("attempts");
    } else {
      setError("Incorrect email or password. Please try again.");
      handleFailedAttempt();
    }
  };

  const handleInstantLogin = (e: any) => {
    e.preventDefault();
    if (isLocked) return;

    if (memorySentence === ADMIN_MEMORY_SENTENCE) {
      setIsAuthenticated(true);
      localStorage.setItem("adminAuthenticated", "true");
      setError("");
      localStorage.removeItem("attempts");
    } else {
      setError("Incorrect memory sentence. Please try again.");
      handleFailedAttempt();
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("adminAuthenticated");
    router.push("/");
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-white">
        <Button onClick={handleLogout} className="absolute top-4 right-4">
          Logout
        </Button>
        <AdminPanel />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-black">
          Admin Login
        </h2>
        {isLocked ? (
          <div className="text-red-500 mb-4">
            Too many failed attempts. Please try again in {Math.ceil(lockoutTime / 1000)} seconds.
          </div>
        ) : !showInstantLogin ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-1 text-black">
                Email:
              </label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-1 text-black">
                Password:
              </label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        ) : (
          <form onSubmit={handleInstantLogin} className="space-y-4">
            <div>
              <label htmlFor="memorySentence" className="block mb-1 text-black">
                Memory Sentence:
              </label>
              <Input
                type="text"
                id="memorySentence"
                value={memorySentence}
                onChange={(e) => setMemorySentence(e.target.value)}
                className="w-full"
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" className="w-full">
              Instant Login
            </Button>
          </form>
        )}
        <Button
          onClick={() => setShowInstantLogin(!showInstantLogin)}
          className="w-full mt-4"
          variant="outline"
          disabled={isLocked}
        >
          {showInstantLogin ? "Back to Normal Login" : "Instant Login"}
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;