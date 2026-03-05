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
import LoadingSpinner from "../../Components/LoadingSpinner";

const Mymusic = () => {

  const [auth, , authLoading] = useAuth();

  const [myMusic, setMyMusic] = useState([]);
  const [likedSongsId, setLikedSongsId] = useState([]);
  const [loading, setLoading] = useState(true);

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

    if (authLoading) return;

    if (!auth?.token) {
      navigate("/");
      return;
    }

    getMyMusic();
    getLikedSongs();

  }, [auth?.token, authLoading]);

  if (authLoading || loading) {
    return <LoadingSpinner />;
  }

  /* ---------------- UI ---------------- */

  return (

    <MainLayout>

      <div className="max-w-5xl mx-auto px-2 sm:px-4 md:px-6 py-6 sm:py-8 md:py-10">

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8 md:mb-10">
          🎵 My Songs
        </h1>

        {myMusic.length === 0 && (
          <div className="text-zinc-400 text-center py-12 sm:py-16 md:py-20 text-sm sm:text-base">
            No songs uploaded yet.
          </div>
        )}

        <div className="space-y-3 sm:space-y-4">

          {myMusic.map((item) => (

            <div
              key={item._id}
              onClick={() => setCurrentSong(item)}
              className="
                flex items-center justify-between
                bg-zinc-900 hover:bg-zinc-800
                p-3 sm:p-4
                rounded-lg sm:rounded-xl
                transition-all duration-200
                cursor-pointer
              "
            >

              {/* LEFT */}

              <div className="flex items-center gap-3 sm:gap-4 min-w-0">

                <img
                  src={item.thumbNail}
                  alt={item.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-md sm:rounded-lg object-cover shadow-md"
                />

                <div className="min-w-0">

                  <p className="text-white text-sm sm:text-base font-medium truncate max-w-[150px] sm:max-w-xs">
                    {item.name.length > 20
                      ? item.name.substring(0, 20) + "..."
                      : item.name}
                  </p>

                </div>

              </div>

              {/* RIGHT */}

              <div className="flex items-center gap-4 sm:gap-6">

                <span className="text-zinc-400 text-xs sm:text-sm">
                  {item.duration}
                </span>

                <FaHeart
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(item._id);
                  }}
                  size={16}
                  className="cursor-pointer"
                  color={
                    likedSongsId.includes(item._id)
                      ? "red"
                      : "#71717a"
                  }
                />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSong(item._id);
                  }}
                  className="
                    p-1.5 sm:p-2
                    rounded-full
                    hover:bg-red-600/20
                    text-red-400
                    hover:text-red-500
                    transition
                  "
                >
                  <Trash2 size={16} />
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