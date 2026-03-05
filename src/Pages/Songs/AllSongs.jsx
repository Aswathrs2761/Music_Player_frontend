import React, { useEffect, useState } from "react";
import MainLayout from "../../Layout/MainLayout";
import axios from "axios";
import { Backend_url } from "../../utils/Config";
import { useCurrentSong } from "../../Context/SongContext";
import { FaHeart } from "react-icons/fa";
import { useAuth } from "../../Context/AuthProvider";
import toast from "react-hot-toast";

const AllSongs = () => {
  const { setCurrentSong, setAllSongs } = useCurrentSong();
  const [auth] = useAuth();

  const [songs, setSongs] = useState([]);
  const [likedSongsId, setLikedSongsId] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH ALL SONGS ---------------- */

  const getAllSongs = async () => {
    try {
      const { data } = await axios.get(
        `${Backend_url}/api/song/get-allsongs`
      );

      const songsArray = data?.songs || [];

      setSongs(songsArray);
      setAllSongs(songsArray);
    } catch (error) {
      toast.error("Failed to load songs");
      setSongs([]);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- FETCH LIKED SONGS ---------------- */

  const getLikedSongs = async () => {
    try {
      const { data } = await axios.get(
        `${Backend_url}/api/user/getlikedsongs`
      );

      const ids =
        data.userLikedSongs?.likedSongs?.map(
          (song) => song._id
        ) || [];

      setLikedSongsId(ids);
    } catch {}
  };

  useEffect(() => {
    getAllSongs();
  }, []);

  useEffect(() => {
    if (auth?.token) {
      getLikedSongs();
    }
  }, [auth?.token]);

  /* ---------------- LIKE TOGGLE ---------------- */

  const toggleLike = async (e, songId) => {
    e.stopPropagation();

    let updated;

    if (likedSongsId.includes(songId)) {
      updated = likedSongsId.filter((id) => id !== songId);
    } else {
      updated = [...likedSongsId, songId];
    }

    setLikedSongsId(updated);

    try {
      await axios.post(
        `${Backend_url}/api/user/addorremovelikes`,
        { newlikedarray: updated }
      );
    } catch {}
  };

  /* ---------------- UI ---------------- */

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-2 sm:px-4">

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8">
          All Songs
        </h1>

        {loading && (
          <p className="text-zinc-500 text-sm sm:text-base">
            Loading songs...
          </p>
        )}

        {!loading && songs?.length === 0 && (
          <p className="text-zinc-500 text-sm sm:text-base">
            No songs available.
          </p>
        )}

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">

          {songs?.map((song) => (
            <div
              key={song._id}
              onClick={() => setCurrentSong(song)}
              className="bg-zinc-900 hover:bg-zinc-800 p-3 sm:p-4 rounded-lg sm:rounded-xl transition duration-300 cursor-pointer group"
            >

              <div className="relative">
                <img
                  src={song.thumbNail}
                  alt={song.name}
                  className="w-full aspect-square object-cover rounded-md sm:rounded-lg mb-3 sm:mb-4"
                />

                <FaHeart
                  onClick={(e) =>
                    toggleLike(e, song._id)
                  }
                  className={`absolute top-2 right-2 sm:top-3 sm:right-3 text-base sm:text-lg transition ${
                    likedSongsId.includes(song._id)
                      ? "text-red-500"
                      : "text-zinc-400 group-hover:text-white"
                  }`}
                />
              </div>

              <h3 className="text-white text-sm sm:text-base font-semibold truncate">
                {song.name}
              </h3>

              {/* <p className="text-xs sm:text-sm text-zinc-400 truncate">
                {song.artist?.firstName ||
                  song.artist?.userName}
              </p> */}

            </div>
          ))}

        </div>

      </div>
    </MainLayout>
  );
};

export default AllSongs;