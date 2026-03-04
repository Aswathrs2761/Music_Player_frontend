import React from "react";

const SongCard = ({ song, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="
        bg-gradient-to-b from-zinc-900 to-zinc-950
        hover:from-zinc-800 hover:to-zinc-900
        rounded-2xl p-4
        transition-all duration-300
        cursor-pointer
        group
        shadow-md hover:shadow-xl
        hover:-translate-y-1
      "
    >
      {/* Image Wrapper */}
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={song.thumbNail}
          alt={song.name}
          className="
            w-full aspect-square
            object-cover
            transition-transform duration-500
            group-hover:scale-105
          "
        />

        {/* Optional Dark Overlay on Hover */}
        <div className="
          absolute inset-0 bg-black/0
          group-hover:bg-black/20
          transition duration-300
        " />
      </div>

      {/* Text Section */}
      <div className="mt-4 space-y-1">

        {/* Song Name */}
        <p className="
          text-white font-semibold text-sm
          leading-snug
          line-clamp-2
        ">
          {song.name}
        </p>

        {/* Artist */}
        {/* <p className="text-zinc-400 text-xs tracking-wide">
          {song.artist?.userName || "Aswath"}
        </p> */}

      </div>
    </div>
  );
};

export default SongCard;