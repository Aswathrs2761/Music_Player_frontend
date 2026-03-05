import React, { useEffect, useState } from "react";
import MainLayout from "../Layout/MainLayout";
import { useAuth } from "../Context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Backend_url } from "../utils/Config";
import { FaHeart } from "react-icons/fa";
import { usePlayList } from "../Context/PlaylistContextProvider";
import toast from "react-hot-toast";

const MyLibrary = () => {
  const [likedSongs, setLikedSongs] = useState([]);
  const [likedPlaylists, setLikedPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  const [auth] = useAuth();
  const navigate = useNavigate();
  const { setPlayListId } = usePlayList();

  /* ---------------- FETCH DATA ---------------- */

  const fetchLibrary = async () => {
    try {
      const [songsRes, playlistsRes] = await Promise.all([
        axios.get(`${Backend_url}/api/user/getlikedsongs`),
        axios.get(
          `${Backend_url}/api/user/getlikedplaylistwithdetails`
        ),
      ]);

      setLikedSongs(
        songsRes.data.userLikedSongs?.likedSongs || []
      );

      setLikedPlaylists(
        playlistsRes.data.LikedPlaylistId?.likedPlaylists || []
      );
    } catch {
      toast.error("Failed to load library");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      fetchLibrary();
    }
  }, [auth?.token]);

  /* ---------------- UI ---------------- */

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-2 sm:px-4 md:px-6 space-y-8 sm:space-y-10 md:space-y-12">

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
          📚 Your Library
        </h1>

        {loading && (
          <p className="text-zinc-500 text-sm sm:text-base">
            Loading library...
          </p>
        )}

        {/* LIKED SONGS CARD */}
        {!loading && (
          <div
            onClick={() => navigate("/likedsongs")}
            className="flex items-center gap-4 sm:gap-6 bg-gradient-to-r from-indigo-600 to-purple-600 p-4 sm:p-6 rounded-xl sm:rounded-2xl cursor-pointer shadow-xl hover:scale-[1.02] transition"
          >
            <FaHeart className="text-white text-3xl sm:text-4xl" />

            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-white">
                Liked Songs
              </h2>

              <p className="text-indigo-100 text-xs sm:text-sm">
                {likedSongs.length} songs
              </p>
            </div>
          </div>
        )}

        {/* LIKED PLAYLISTS */}
        <div>

          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6">
            Liked Playlists
          </h2>

          {likedPlaylists.length === 0 ? (
            <p className="text-zinc-500 text-sm sm:text-base">
              You haven’t liked any playlists yet.
            </p>
          ) : (
            <div className="space-y-2 sm:space-y-3">

              {likedPlaylists.map((playlist) => (
                <div
                  key={playlist._id}
                  onClick={() => {
                    localStorage.setItem(
                      "currentPlaylist",
                      JSON.stringify(playlist._id)
                    );
                    setPlayListId(playlist._id);
                    navigate("/playlist-songs");
                  }}
                  className="flex items-center gap-3 sm:gap-4 bg-zinc-900 hover:bg-zinc-800 p-3 sm:p-4 rounded-lg transition cursor-pointer"
                >

                  <img
                    src={playlist.thumbNail}
                    alt={playlist.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-md object-cover"
                  />

                  <div className="min-w-0">
                    <p className="text-white text-sm sm:text-base font-medium truncate max-w-[160px] sm:max-w-xs">
                      {playlist.name}
                    </p>

                    <p className="text-xs sm:text-sm text-zinc-400">
                      Playlist
                    </p>
                  </div>

                </div>
              ))}

            </div>
          )}
        </div>

      </div>
    </MainLayout>
  );
};

export default MyLibrary;