import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Globe, LayoutDashboard, LogIn, UserPlus, LogOut } from "lucide-react";
import api from "@/lib/api";

export default function Navbar() {
  const { t, i18n } = useTranslation();

  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const token = localStorage.getItem("token");
  const loggedIn = Boolean(token);

  const navigate = (path) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
    setDropdownOpen(false);
  };

  const changeLanguage = async (language) => {
    try {
      await i18n.changeLanguage(language);
      localStorage.setItem("i18nextLng", language);
    } catch (error) {
      console.error("Language change failed:", error);
    }
  };

  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }

    let cancelled = false;

    api
      .get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (!cancelled) {
          setUser(res.data?.data?.user ?? res.data?.user ?? null);
        }
      })
      .catch((error) => {
        if (!cancelled) {
          console.error("Error fetching profile:", error);
          setUser(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setDropdownOpen(false);
    navigate("/login");
  };

  const profileInitials = user?.name
    ? user.name
        .trim()
        .split(/\s+/)
        .map((part) => part.charAt(0).toUpperCase())
        .slice(0, 2)
        .join("")
    : "U";

  const currentLanguage = i18n.resolvedLanguage || i18n.language || "en";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800/70 bg-black/90 shadow-2xl backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-2 sm:h-20">

          {/* TaskFlow AI Logo */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="group flex min-w-0 items-center gap-2 sm:gap-3"
            aria-label="TaskFlow AI Home"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-emerald-400/30 bg-gradient-to-tr from-green-500 to-emerald-300 shadow-lg shadow-green-500/20 sm:h-11 sm:w-11">
              <img
                src="/logo.png"
                alt="TaskFlow AI"
                className="h-full w-full object-cover"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                  event.currentTarget.parentElement.textContent = "⚡";
                }}
              />
            </div>

            <span className="truncate bg-gradient-to-r from-white to-gray-300 bg-clip-text text-lg font-extrabold text-transparent transition-colors group-hover:from-green-300 group-hover:to-emerald-400 sm:text-2xl">
              TaskFlow AI
            </span>
          </button>

          {/* Right-side controls */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-4">

            {/* Language Selector */}
            <label className="flex items-center gap-1.5 rounded-xl border border-gray-700 bg-gray-900 px-2 py-2 transition hover:border-emerald-500 sm:gap-2 sm:px-3">
              <Globe
                size={17}
                className="shrink-0 text-emerald-400"
                aria-hidden="true"
              />

              <select
                value={currentLanguage.startsWith("bn") ? "bn" : "en"}
                onChange={(event) => changeLanguage(event.target.value)}
                className="max-w-[100px] cursor-pointer bg-transparent text-xs font-semibold text-white outline-none sm:max-w-none sm:text-sm"
                aria-label="Select language / ভাষা নির্বাচন করুন"
              >
                <option className="bg-gray-900 text-white" value="en">
                  English
                </option>
                <option className="bg-gray-900 text-white" value="bn">
                  বাংলা
                </option>
              </select>
            </label>

            {/* Logged-in user menu */}
            {loggedIn && user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen((previous) => !previous)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white shadow-lg transition hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 sm:h-10 sm:w-10"
                  aria-label="Open profile menu"
                  aria-expanded={dropdownOpen}
                >
                  {profileInitials}
                </button>

                {dropdownOpen && (
                  <>
                    <button
                      type="button"
                      className="fixed inset-0 z-40 cursor-default"
                      aria-label="Close profile menu"
                      onClick={() => setDropdownOpen(false)}
                    />

                    <div className="absolute right-0 z-50 mt-3 w-64 overflow-hidden rounded-2xl border border-gray-700 bg-gray-950 text-white shadow-2xl">
                      <div className="border-b border-gray-800 px-4 py-4">
                        <p className="truncate text-sm font-bold">
                          {user.name}
                        </p>
                        <p className="mt-1 truncate text-xs text-gray-400">
                          {user.email}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => navigate("/dashboard")}
                        className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition hover:bg-emerald-500/10 hover:text-emerald-300"
                      >
                        <LayoutDashboard
                          size={17}
                          className="text-emerald-400"
                        />
                        {t("dashboard", "Dashboard")}
                      </button>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 border-t border-gray-800 px-4 py-3 text-left text-sm text-red-400 transition hover:bg-red-500/10"
                      >
                        <LogOut size={17} />
                        {currentLanguage.startsWith("bn")
                          ? "লগ আউট"
                          : "Log out"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="flex items-center gap-1 rounded-xl px-2 py-2 text-xs font-semibold text-gray-300 transition hover:bg-gray-800 hover:text-white sm:gap-2 sm:px-4 sm:text-sm"
                >
                  <LogIn size={16} />
                  <span>
                    {currentLanguage.startsWith("bn")
                      ? "লগইন"
                      : "Sign In"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/signup")}
                  className="flex items-center gap-1 rounded-xl bg-emerald-600 px-2.5 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500 sm:gap-2 sm:px-4 sm:text-sm"
                >
                  <UserPlus size={16} />
                  <span>
                    {currentLanguage.startsWith("bn")
                      ? "শুরু করুন"
                      : "Get Started"}
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}