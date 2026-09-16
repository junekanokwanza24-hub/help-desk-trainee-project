"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Enter your email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3006/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          setError("Incorrect email or password.");
        } else {
          setError("Sign in failed. Try again.");
        }
        return;
      }

      const data = await res.json();
      localStorage.setItem("access_token", data.access_token);
      window.location.href = "/tickets";
    } catch {
      setError("Couldn't reach the server. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white">
      {/* Left: form */}
      <div className="flex-1 flex flex-col justify-between px-8 py-10 sm:px-16 lg:px-24">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#F3EDF9" }}
          >
            <Icon icon="mdi:headset" width={18} height={18} color="#613189" />
          </div>
          <span
            className="text-[15px] font-medium tracking-tight"
            style={{ color: "#1E1522" }}
          >
            HelpDesk IT
          </span>
        </div>

        <div className="w-full max-w-sm mx-auto">
          <h1
            className="text-[26px] font-medium leading-tight mb-2"
            style={{ color: "#1E1522" }}
          >
            Sign in to IT helpdesk
          </h1>
          <p className="text-[14px] mb-8" style={{ color: "#746B7E" }}>
            Log tickets, track fixes, and get support to the right person.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-[13px] font-medium mb-1.5"
                style={{ color: "#1E1522" }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@obomgauge.com"
                className="w-full h-11 px-3.5 rounded-lg text-[14px] outline-none transition-colors"
                style={{
                  border: "1px solid #E8E2EE",
                  color: "#1E1522",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#613189")}
                onBlur={(e) => (e.target.style.borderColor = "#E8E2EE")}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-[13px] font-medium"
                  style={{ color: "#1E1522" }}
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-[13px] font-medium hover:underline"
                  style={{ color: "#613189" }}
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full h-11 px-3.5 pr-11 rounded-lg text-[14px] outline-none transition-colors"
                  style={{
                    border: "1px solid #E8E2EE",
                    color: "#1E1522",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#613189")}
                  onBlur={(e) => (e.target.style.borderColor = "#E8E2EE")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "#746B7E" }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <Icon
                    icon={
                      showPassword ? "mdi:eye-off-outline" : "mdi:eye-outline"
                    }
                    width={17}
                    height={17}
                  />
                </button>
              </div>
            </div>

            {error && (
              <p className="text-[13px]" style={{ color: "#B3261E" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-lg text-[14px] font-medium text-white transition-opacity disabled:opacity-60"
              style={{ backgroundColor: "#613189" }}
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>

        <p className="text-[12.5px]" style={{ color: "#9891A0" }}>
          Internal system.
        </p>
      </div>

      {/* Right: brand panel */}
      <div
        className="hidden lg:flex flex-1 relative items-center justify-center overflow-hidden"
        style={{ backgroundColor: "#613189" }}
      >
        <svg viewBox="0 0 360 360" className="w-[340px] h-[340px]" fill="none">
          <circle
            cx="180"
            cy="180"
            r="150"
            stroke="#8C5CB0"
            strokeWidth="1"
            opacity="0.5"
          />
          <circle
            cx="180"
            cy="180"
            r="115"
            stroke="#8C5CB0"
            strokeWidth="1"
            opacity="0.4"
          />
          {Array.from({ length: 40 }).map((_, i) => {
            const angle = (i / 40) * 2 * Math.PI - Math.PI / 2;
            const inner = 128;
            const outer = i % 5 === 0 ? 145 : 138;
            const x1 = 180 + inner * Math.cos(angle);
            const y1 = 180 + inner * Math.sin(angle);
            const x2 = 180 + outer * Math.cos(angle);
            const y2 = 180 + outer * Math.sin(angle);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#C9AEDD"
                strokeWidth={i % 5 === 0 ? 2 : 1}
                opacity={i % 5 === 0 ? 0.9 : 0.5}
              />
            );
          })}
          <line
            x1="180"
            y1="180"
            x2="255"
            y2="120"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="180" cy="180" r="8" fill="#FFFFFF" />
        </svg>

        <div className="absolute bottom-12 left-12 right-12">
          <p className="text-[13px] mb-1" style={{ color: "#D8C4E8" }}>
            Avg. resolution time, today
          </p>
          <p className="text-[32px] font-medium text-white">2.4 hrs</p>
        </div>
      </div>
    </div>
  );
}
