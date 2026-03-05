import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";
import { ChevronDown, Upload, LogOut } from "lucide-react";

const AuthMenu = () => {

  const navigate = useNavigate();
  const [auth] = useAuth();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const profileLetter =
    auth?.user?.userName?.charAt(0)?.toUpperCase() || "A";

  /* ---------- CLOSE DROPDOWN ---------- */

  useEffect(() => {

    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };

  }, []);

  return (
    <div className="flex justify-end items-center relative z-40">

      {auth?.token ? (

        <div className="relative" ref={dropdownRef}>

          {/* PROFILE BUTTON */}

          <button
            onClick={() => setOpen((prev) => !prev)}
            className="
            flex items-center gap-2
            p-1.5
            rounded-full
            hover:bg-zinc-800
            transition
            "
          >

            {/* AVATAR */}

            <div
              className="
              w-9 h-9
              rounded-full
              bg-gradient-to-br from-indigo-500 to-purple-600
              flex items-center justify-center
              text-white font-semibold text-sm
              "
            >
              {profileLetter}
            </div>

            <ChevronDown
              size={16}
              className={`transition ${
                open ? "rotate-180 text-white" : "text-zinc-400"
              }`}
            />

          </button>

          {/* DROPDOWN */}

          <div
            className={`
            absolute right-0 mt-2
            w-56
            rounded-xl
            bg-zinc-900/95 backdrop-blur-md
            border border-zinc-800
            shadow-xl
            overflow-hidden
            transition-all duration-200 origin-top-right
            ${
              open
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }
            `}
          >

            {/* USER INFO */}

            <div className="px-4 py-3 border-b border-zinc-800">

              <p className="text-white text-sm font-semibold leading-tight">
                {auth?.user?.userName}
              </p>

              <p className="text-zinc-400 text-xs truncate mt-1">
                {auth?.user?.emailId}
              </p>

            </div>

            {/* MENU LINKS */}

            <div className="py-1">

              <Link
                to="/uploadsong"
                onClick={() => setOpen(false)}
                className="
                flex items-center gap-3
                px-4 py-2
                text-sm
                text-blue-400
                hover:bg-zinc-800
                transition
                !no-underline
                "
              >
                <Upload size={16} />
                Upload Song
              </Link>

              <Link
                to="/logout"
                onClick={() => setOpen(false)}
                className="
                flex items-center gap-3
                px-4 py-2
                text-sm
                text-blue-400
                hover:bg-zinc-800
                transition
                !no-underline
                "
              >
                <LogOut size={16} />
                Log Out
              </Link>

            </div>

          </div>

        </div>

      ) : (

        /* LOGIN / SIGNUP BUTTONS */

        <div className="flex gap-2">

          <button
            onClick={() => navigate("/signup")}
            className="
            px-4 py-2
            border border-zinc-700
            text-zinc-300
            text-sm
            rounded-lg
            hover:bg-zinc-800
            transition
            "
          >
            Sign Up
          </button>

          <button
            onClick={() => navigate("/")}
            className="
            px-4 py-2
            bg-indigo-600
            hover:bg-indigo-700
            text-white
            text-sm
            rounded-lg
            transition
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