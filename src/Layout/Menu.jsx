import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { RiNeteaseCloudMusicLine } from "react-icons/ri";
import { FaSearch, FaBars } from "react-icons/fa";
import { LuLibrary } from "react-icons/lu";
import { FaSquarePlus } from "react-icons/fa6";
import { MdLibraryMusic } from "react-icons/md";
import { BiSolidPlaylist } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

const Menu = () => {
  const [open, setOpen] = useState(false);

  const linkClass =
    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 !no-underline";

  const activeClass = "bg-zinc-800 text-white";
  const inactiveClass =
    "text-zinc-400 hover:text-white hover:bg-zinc-900";

  return (
    <>
      {/* BURGER ICON (mobile only) */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-[999] text-white text-2xl"
      >
        <FaBars />
      </button>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
        fixed md:static top-0 left-0 h-full w-64
        bg-black text-white z-50
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        `}
      >
        <div className="h-full flex flex-col px-4 py-6">

          {/* CLOSE BUTTON (mobile) */}
          <button
            onClick={() => setOpen(false)}
            className="md:hidden absolute top-4 right-4 text-2xl"
          >
            <IoClose />
          </button>

          {/* LOGO */}
          <div className="flex items-center gap-3 mb-10 px-2">
            <RiNeteaseCloudMusicLine className="text-3xl text-indigo-500" />
            <span className="text-xl font-bold tracking-wide">
              Music
            </span>
          </div>

          {/* MAIN NAVIGATION */}
          <nav className="flex flex-col gap-2">

            <NavLink
              to="/Home"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              <IoMdHome /> Home
            </NavLink>

            <NavLink
              to="/search"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              <FaSearch /> Search
            </NavLink>

            <NavLink
              to="/myLibrary"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              <LuLibrary /> My Library
            </NavLink>

          </nav>

          <div className="border-t border-zinc-800 my-6"></div>

          {/* SECONDARY MENU */}
          <nav className="flex flex-col gap-2">

            <NavLink
              to="/mymusic"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              <MdLibraryMusic /> My Music
            </NavLink>

            <NavLink
              to="/myPlaylists"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              <BiSolidPlaylist /> My Playlists
            </NavLink>

            <NavLink
              to="/createplaylist"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              <FaSquarePlus /> Create Playlist
            </NavLink>

          </nav>

        </div>
      </aside>
    </>
  );
};

export default Menu;