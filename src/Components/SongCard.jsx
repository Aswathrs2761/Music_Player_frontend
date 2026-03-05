import React from "react";

const SongCard = ({ song, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="
        bg-gradient-to-b from-zinc-900 to-zinc-950
        hover:from-zinc-800 hover:to-zinc-900
        rounded-2xl
        p-4
        transition-all duration-300
        cursor-pointer
        group
        shadow-md hover:shadow-xl
        hover:-translate-y-1
        flex flex-col items-center text-center
      "
    >
      {/* Song Image */}
      <div className="flex justify-center items-center w-full">
        <img
          src={song.thumbNail}
          alt={song.name}
          className="
            w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36
            object-cover
            rounded-xl
            transition-transform duration-500
            group-hover:scale-105
          "
        />
      </div>

      {/* Song Name */}
      <p
        className="
          text-white font-semibold
          text-sm sm:text-base
          mt-4
          line-clamp-2
        "
      >
        {song.name}
      </p>

    </div>
  );
};

export default SongCard;