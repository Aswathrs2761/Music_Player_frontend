import React, { useEffect, useRef, useState } from "react";
import { LuShuffle } from "react-icons/lu";
import { MdOutlineSkipPrevious, MdOutlineSkipNext } from "react-icons/md";
import { FaCirclePlay } from "react-icons/fa6";
import { FaPauseCircle } from "react-icons/fa";
import { IoMdRepeat } from "react-icons/io";
import { RiRepeatOneLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { Howl } from "howler";
import { useCurrentSong } from "../Context/SongContext";

const Footer = () => {

  const {
    currentSong,
    setCurrentSong,
    soundPlayed,
    setSoundPlayed,
    songId,
    setSongId,
    isPaused,
    setIsPaused,
    allSongs,
    prevSongs,
    setPrevSongs
  } = useCurrentSong();

  const [repeatMode, setRepeatMode] = useState(false);

  const repeatModeRef = useRef(repeatMode);
  const allSongsRef = useRef(allSongs);

  useEffect(() => {
    repeatModeRef.current = repeatMode;
  }, [repeatMode]);

  useEffect(() => {
    allSongsRef.current = allSongs;
  }, [allSongs]);

  /* ---------------- CLOSE PLAYER ---------------- */

  const closePlayer = () => {

    if (soundPlayed) {
      soundPlayed.stop();
    }

    setSoundPlayed(null);
    setCurrentSong(null);
    setSongId(null);
    setIsPaused(true);

  };

  /* ---------------- PLAY / PAUSE ---------------- */

  const playMusic = () => soundPlayed?.play();
  const pauseMusic = () => soundPlayed?.pause();

  /* ---------------- CHANGE SONG ---------------- */

  const changeSong = (track) => {

    if (soundPlayed) soundPlayed.stop();

    const sound = new Howl({
      src: [track],
      html5: true,

      onend: () => {

        setIsPaused(true);

        if (repeatModeRef.current) {
          changeSong(currentSong.track);
          return;
        }

        const index = allSongsRef.current.findIndex(
          s => s._id === currentSong._id
        );

        if (index + 1 < allSongsRef.current.length) {
          setCurrentSong(allSongsRef.current[index + 1]);
        }

      }

    });

    setSoundPlayed(sound);
    sound.play();

    setIsPaused(false);

  };

  useEffect(() => {

    if (!currentSong) return;
    if (songId === currentSong._id) return;

    changeSong(currentSong.track);
    setSongId(currentSong._id);

  }, [currentSong]);

  /* ---------------- CONTROLS ---------------- */

  const togglePlayPause = () => {

    if (isPaused) {
      playMusic();
      setIsPaused(false);
    } else {
      pauseMusic();
      setIsPaused(true);
    }

  };

  const nextSong = () => {

    const index = allSongs.findIndex(
      s => s._id === currentSong._id
    );

    if (index + 1 < allSongs.length) {
      setCurrentSong(allSongs[index + 1]);
    }

  };

  const previousSong = () => {

    if (prevSongs.length > 1) {

      const previous = prevSongs[prevSongs.length - 2];

      setCurrentSong(previous);

      setPrevSongs(prev =>
        prev.slice(0, prev.length - 1)
      );

    }

  };

  const toggleRepeatMode = () => {
    setRepeatMode(prev => !prev);
  };

  if (!currentSong) return null;

  return (

    <div
      className="
      fixed bottom-0 left-0
      md:left-64
      w-full md:w-[calc(100%-16rem)]
      bg-zinc-950 border-t border-zinc-800
      px-3 sm:px-6 py-2
      z-50
      "
    >

      {/* CLOSE BUTTON */}

      <div className="absolute right-3 top-2">
        <IoClose
          onClick={closePlayer}
          className="cursor-pointer text-zinc-400 hover:text-red-500"
          size={22}
        />
      </div>

      {/* MAIN PLAYER */}

      <div className="flex items-center justify-between">

        {/* LEFT */}

        <div className="flex items-center gap-2 sm:gap-3 w-[35%]">

          <img
            src={currentSong.thumbNail}
            alt="song"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-md object-cover"
          />

          <div className="truncate">

            <p className="text-white text-xs sm:text-sm truncate">
              {currentSong.name}
            </p>

            <p className="text-zinc-400 text-[10px] sm:text-xs truncate">
              {currentSong.artist?.userName}
            </p>

          </div>

        </div>

        {/* CENTER CONTROLS */}

        <div className="flex items-center justify-center gap-4 sm:gap-6">

          <LuShuffle
            className="hidden sm:block cursor-pointer hover:text-indigo-400"
            size={18}
          />

          <MdOutlineSkipPrevious
            onClick={previousSong}
            className="cursor-pointer hover:text-white"
            size={22}
          />

          {isPaused ? (
            <FaCirclePlay
              onClick={togglePlayPause}
              className="cursor-pointer text-indigo-500"
              size={32}
            />
          ) : (
            <FaPauseCircle
              onClick={togglePlayPause}
              className="cursor-pointer text-indigo-500"
              size={32}
            />
          )}

          <MdOutlineSkipNext
            onClick={nextSong}
            className="cursor-pointer hover:text-white"
            size={22}
          />

          {repeatMode ? (
            <RiRepeatOneLine
              onClick={toggleRepeatMode}
              className="hidden sm:block cursor-pointer text-indigo-400"
              size={20}
            />
          ) : (
            <IoMdRepeat
              onClick={toggleRepeatMode}
              className="hidden sm:block cursor-pointer hover:text-indigo-400"
              size={20}
            />
          )}

        </div>

        {/* RIGHT */}

        <div className="text-zinc-400 text-xs sm:text-sm w-[20%] text-right">
          {currentSong.duration}
        </div>

      </div>

    </div>

  );

};

export default Footer;