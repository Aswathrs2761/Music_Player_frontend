import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";
import { ChevronDown } from "lucide-react";

const AuthMenu = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const profileLetter =
    auth?.user?.userName?.charAt(0)?.toUpperCase() || "A";

  /* -------- Close on Outside Click -------- */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-end items-center relative">

      {auth?.token ? (
        <div className="relative" ref={dropdownRef}>

          {/* Avatar Button */}
          <button
            onClick={() => setOpen(!open)}
            className="
              flex items-center gap-3
              bg-zinc-900/80 backdrop-blur-md
              border border-zinc-800
              px-3 py-2 rounded-full
              hover:border-indigo-500/40
              hover:bg-zinc-800
              transition-all duration-300
            "
          >
            <div
              className="
                w-9 h-9 rounded-full
                bg-gradient-to-br from-indigo-500 to-purple-600
                flex items-center justify-center
                text-white font-semibold text-sm
                shadow-md
              "
            >
              {profileLetter}
            </div>

            <ChevronDown
              size={16}
              className={`text-zinc-400 transition-transform duration-300 ${
                open ? "rotate-180 text-white" : ""
              }`}
            />
          </button>

          {/* Dropdown */}
          <div
            className={`
              absolute right-0 mt-4 w-60
              bg-zinc-900/95 backdrop-blur-xl
              border border-zinc-800
              rounded-2xl shadow-2xl
              overflow-hidden
              transition-all duration-200 origin-top
              z-50
              ${
                open
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              }
            `}
          >

            {/* User Info */}
            <div className="px-5 py-4 border-b border-zinc-800">
              <p className="text-white font-medium text-sm">
                {auth?.user?.userName}
              </p>
              <p className="text-zinc-400 text-xs mt-1">
                {auth?.user?.email}
              </p>
            </div>

            {/* Menu Links */}
            <div className="py-2">

              <Link
                to="/uploadsong"
                onClick={() => setOpen(false)}
                className="
                  block px-5 py-3 text-sm
                  text-zinc-300
                  hover:bg-zinc-800
                  hover:text-white
                  transition
                  no-underline
                "
              >
                Upload Song
              </Link>

              <Link
                to="/logout"
                onClick={() => setOpen(false)}
                className="
                  block px-5 py-3 text-sm
                  text-red-400
                  hover:bg-red-600/10
                  hover:text-red-500
                  transition
                  no-underline
                "
              >
                Log Out
              </Link>

            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-4">

          <button
            onClick={() => navigate("/signup")}
            className="
              px-5 py-2
              border border-zinc-800
              text-zinc-300
              rounded-lg
              hover:border-indigo-500/40
              hover:text-white
              transition
            "
          >
            Sign Up
          </button>

          <button
            onClick={() => navigate("/login")}
            className="
              px-5 py-2
              bg-gradient-to-r from-indigo-500 to-purple-600
              hover:opacity-90
              text-white font-medium
              rounded-lg
              transition
              shadow-lg
            "
          >
            Log In
          </button>

        </div>
      )}
    </div>
  );
};

export default AuthMenu;