import React, { useEffect, useState } from "react";
import axios from "axios";
import { Backend_url } from "../../utils/Config";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../Layout/MainLayout";
import { useAuth } from "../../Context/AuthProvider";
import { useCurrentSong } from "../../Context/SongContext";
import { Trash2 } from "lucide-react";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";

const Mymusic = () => {
  const [auth] = useAuth();
  const [myMusic, setMyMusic] = useState([]);
  const [likedSongsId, setLikedSongsId] = useState([]);

  const navigate = useNavigate();
  const { setCurrentSong, setAllSongs } = useCurrentSong();

  /* ---------------- FETCH MY SONGS ---------------- */

  const getMyMusic = async () => {
    try {
      const res = await axios.get(
        `${Backend_url}/api/song/get-mysong`
      );

      if (!res.data.success) {
        toast.error(res.data.message);
        navigate("/");
        return;
      }

      setMyMusic(res.data.mySongs);
      setAllSongs(res.data.mySongs);
    } catch {
      toast.error("Failed to load songs");
    }
  };

  /* ---------------- FETCH LIKED SONGS ---------------- */

  const getLikedSongs = async () => {
    try {
      const { data } = await axios.get(
        `${Backend_url}/api/user/getlikedsongs`
      );

      const likedIds =
        data.userLikedSongs?.likedSongs?.map((s) => s._id) || [];

      setLikedSongsId(likedIds);
    } catch {
      console.log("Failed to load liked songs");
    }
  };

  /* ---------------- TOGGLE LIKE ---------------- */

  const toggleLike = async (songId) => {
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
    } catch {
      toast.error("Failed to update like");
    }
  };

  /* ---------------- DELETE SONG ---------------- */

  const deleteSong = async (id) => {
    const confirmDelete = window.confirm(
      "Do you want to delete this song?"
    );

    if (!confirmDelete) return;

    try {
      await axios.get(
        `${Backend_url}/api/song/deletesongbyid/${id}`
      );

      toast.success("Song deleted");
      getMyMusic();
      setCurrentSong(null);
    } catch {
      toast.error("Delete failed");
    }
  };

  /* ---------------- AUTH CHECK ---------------- */

  useEffect(() => {
    if (auth?.token) {
      getMyMusic();
      getLikedSongs();
    } else {
      navigate("/login");
    }
  }, [auth?.token]);

  /* ---------------- UI ---------------- */

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto px-6 py-10">

        <h1 className="text-3xl font-bold text-white mb-10">
          🎵 My Songs
        </h1>

        {myMusic.length === 0 && (
          <div className="text-zinc-400 text-center py-20">
            No songs uploaded yet.
          </div>
        )}

        <div className="space-y-4">
          {myMusic.map((item) => (
            <div
              key={item._id}
              onClick={() => setCurrentSong(item)}
              className="
                flex items-center justify-between
                bg-zinc-900 hover:bg-zinc-800
                p-4 rounded-xl
                transition-all duration-200
                cursor-pointer
              "
            >
              {/* LEFT */}
              <div className="flex items-center gap-4">
                <img
                  src={item.thumbNail}
                  alt={item.name}
                  className="w-14 h-14 rounded-lg object-cover shadow-md"
                />

                <div>
                  <p className="text-white font-medium">
                    {item.name.length > 20
                      ? item.name.substring(0, 20) + "..."
                      : item.name}
                  </p>

                  {/* <p className="text-sm text-zinc-400">
                    {item.artist?.userName}
                  </p> */}
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-6">

                <span className="text-zinc-400 text-sm">
                  {item.duration}
                </span>

                {/* LIKE */}
                <FaHeart
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(item._id);
                  }}
                  size={18}
                  className="transition cursor-pointer"
                  color={
                    likedSongsId.includes(item._id)
                      ? "red"
                      : "#71717a"
                  }
                />

                {/* DELETE */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSong(item._id);
                  }}
                  className="
                    p-2 rounded-full
                    hover:bg-red-600/20
                    text-red-400
                    hover:text-red-500
                    transition
                  "
                >
                  <Trash2 size={18} />
                </button>

              </div>
            </div>
          ))}
        </div>

      </div>
    </MainLayout>
  );
};

export default Mymusic;