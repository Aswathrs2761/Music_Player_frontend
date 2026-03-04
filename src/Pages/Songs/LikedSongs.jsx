import React, { useEffect, useState } from "react";
import MainLayout from "../../Layout/MainLayout";
import { useAuth } from "../../Context/AuthProvider";
import axios from "axios";
import { Backend_url } from "../../utils/Config";
import { FaHeart } from "react-icons/fa";
import { useCurrentSong } from "../../Context/SongContext";
import toast from "react-hot-toast";

const LikedSongs = () => {
  const [likedSongs, setLikedSongs] = useState([]);
  const [likedSongsId, setLikedSongsId] = useState([]);
  const [loading, setLoading] = useState(true);

  const [auth] = useAuth();
  const { setCurrentSong, setAllSongs } = useCurrentSong();

  /* ---------------- FETCH LIKED SONGS ---------------- */

  const getLikedSongs = async () => {
    try {
      const { data } = await axios.get(
        `${Backend_url}/api/user/getlikedsongs`
      );

      const songs = data.userLikedSongs?.likedSongs || [];

      setLikedSongs(songs);
      setAllSongs(songs);

      const ids = songs.map((song) => song._id);
      setLikedSongsId(ids);
    } catch {
      toast.error("Failed to load liked songs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getLikedSongs();
    }
  }, [auth?.token]);

  /* ---------------- REMOVE LIKE ---------------- */

  const removeLike = async (e, songId) => {
    e.stopPropagation();

    const updated = likedSongsId.filter(
      (id) => id !== songId
    );

    setLikedSongsId(updated);
    setLikedSongs((prev) =>
      prev.filter((song) => song._id !== songId)
    );

    try {
      await axios.post(
        `${Backend_url}/api/user/addorremovelikes`,
        { newlikedarray: updated }
      );

      toast.success("Removed from liked songs");
    } catch {
      toast.error("Something went wrong");
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          ❤️ Liked Songs
        </h1>

        {loading && (
          <p className="text-zinc-500">
            Loading your liked songs...
          </p>
        )}

        {!loading && likedSongs.length === 0 && (
          <p className="text-zinc-500">
            You haven't liked any songs yet.
          </p>
        )}

        <div className="space-y-3">
          {likedSongs.map((song) => (
            <div
              key={song._id}
              onClick={() => setCurrentSong(song)}
              className="flex justify-between items-center bg-zinc-900 hover:bg-zinc-800 p-4 rounded-lg transition cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <img
                  src={song.thumbNail}
                  alt={song.name}
                  className="w-12 h-12 rounded-md object-cover"
                />
                <div>
                  <p className="text-white font-medium truncate max-w-xs">
                    {song.name}
                  </p>
                  {/* <p className="text-sm text-zinc-400 truncate max-w-xs">
                    {song.artist?.userName}
                  </p> */}
                </div>
              </div>

              <div className="flex items-center gap-6">
                <span className="text-sm text-zinc-400">
                  {song.duration}
                </span>

                <FaHeart
                  onClick={(e) =>
                    removeLike(e, song._id)
                  }
                  className="text-red-500 hover:text-red-400 transition"
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </MainLayout>
  );
};

export default LikedSongs;