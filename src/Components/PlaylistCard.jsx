import React from "react";

const PlaylistCard = ({ playList = {}, onClick }) => {
  const name = (playList.name || "").trim();

  const truncated = (text, len) =>
    text.length > len ? text.substring(0, len) + "..." : text;

  return (
    <div
      onClick={() => onClick && onClick(playList)}
      className="
        group cursor-pointer
        bg-zinc-900 border border-zinc-800
        rounded-xl
        overflow-hidden
        transition duration-300
        hover:-translate-y-1
        hover:shadow-xl hover:shadow-indigo-500/10
      "
    >
      {/* Thumbnail */}
      <div className="relative h-44 w-full overflow-hidden">
        <img
          src={playList.thumbNail}
          alt={name}
          loading="lazy"
          className="
            w-full h-full object-cover
            transition duration-300
            group-hover:scale-105
          "
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition"></div>
      </div>

      {/* Body */}
      <div className="p-4">
        <p className="text-white font-medium text-sm tracking-wide">
          {truncated(name, 18)}
        </p>
      </div>
    </div>
  );
};

export default PlaylistCard;