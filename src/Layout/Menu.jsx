import React from "react";
import { NavLink } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { RiNeteaseCloudMusicLine } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { LuLibrary } from "react-icons/lu";
import { FaSquarePlus } from "react-icons/fa6";
import { MdLibraryMusic } from "react-icons/md";
import { BiSolidPlaylist } from "react-icons/bi";

const Menu = () => {
  const linkClass =
    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 !no-underline";

  const activeClass = "bg-zinc-800 text-white";
  const inactiveClass =
    "text-zinc-400 hover:text-white hover:bg-zinc-900";

  return (
    <div className="h-full flex flex-col px-4 py-6 ">

      {/* Logo */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <RiNeteaseCloudMusicLine className="text-3xl text-indigo-500 " />
        <span className="text-xl font-bold tracking-wide">
          Music
        </span>
      </div>

      {/* Main Navigation */}
      <nav className="flex flex-col gap-2 ">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <IoMdHome className="text-lg " />
          Home
        </NavLink>

        <NavLink
          to="/search"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <FaSearch className="text-lg" />
          Search
        </NavLink>

        <NavLink
          to="/myLibrary"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <LuLibrary className="text-lg" />
          My Library
        </NavLink>
      </nav>

      {/* Divider */}
      <div className="border-t border-zinc-800 my-6"></div>

      {/* Secondary Section */}
      <nav className="flex flex-col gap-2">

        <NavLink
          to="/mymusic"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <MdLibraryMusic className="text-lg" />
          My Music
        </NavLink>

        <NavLink
          to="/myPlaylists"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <BiSolidPlaylist className="text-lg" />
          My Playlists
        </NavLink>

        <NavLink
          to="/createplaylist"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <FaSquarePlus className="text-lg" />
          Create Playlist
        </NavLink>
      </nav>
    </div>
  );
};

export default Menu;