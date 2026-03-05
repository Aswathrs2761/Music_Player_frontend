import React, { useEffect, useState } from "react";
import MainLayout from "../Layout/MainLayout";
import axios from "axios";
import { Backend_url } from "../utils/Config";
import { useNavigate } from "react-router-dom";
import { useCurrentSong } from "../Context/SongContext";
import { usePlayList } from "../Context/PlaylistContextProvider";
import { FaHeart } from "react-icons/fa";
import { useAuth } from "../Context/AuthProvider";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [likedSongsId, setLikedSongsId] = useState([]);

  const { setCurrentSong } = useCurrentSong();
  const { setPlayListId } = usePlayList();

  // const [auth] = useAuth();

  const navigate = useNavigate();

  /* ---------------- SEARCH ---------------- */

  const searchSongs = async (text) => {
    if (!text.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const { data } = await axios.post(
        `${Backend_url}/api/song/search-songs`,
        { searchText: text }
      );

      if (data.success) {
        setSearchResults(data.result);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.log(error);
      setSearchResults([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchSongs(searchText);
  };

  /* ---------------- FETCH LIKED SONGS ---------------- */

  const getLikedSongs = async () => {
    try {
      const { data } = await axios.get(
        `${Backend_url}/api/user/getlikedsongs`
      );

      const likedIds =
        data.userLikedSongs?.likedSongs?.map((song) => song._id) || [];

      setLikedSongsId(likedIds);
    } catch (error) {
      console.log("Failed to load liked songs");
    }
  };

  /* ---------------- UPDATE LIKES ---------------- */

  const addOrRemoveLikes = async (newlikedarray) => {
    try {
      await axios.post(
        `${Backend_url}/api/user/addorremovelikes`,
        { newlikedarray }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleHeartClick = (e, songId) => {
    e.stopPropagation();

    let updated;

    if (likedSongsId.includes(songId)) {
      updated = likedSongsId.filter((id) => id !== songId);
    } else {
      updated = [...likedSongsId, songId];
    }

    setLikedSongsId(updated);
    addOrRemoveLikes(updated);
  };

  /* ---------------- AUTH CHECK ---------------- */

 const [auth, , authLoading] = useAuth();

useEffect(() => {

  if (authLoading) return;

  if (!auth?.token) {
    navigate("/");
  }

}, [auth?.token, authLoading]);

  /* ---------------- UI ---------------- */

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black px-3 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">

        <div className="max-w-4xl mx-auto">

          {/* SEARCH BAR */}
          <form onSubmit={handleSubmit} className="mb-8 sm:mb-10 md:mb-12">

            <div className="flex items-center bg-zinc-800 rounded-full px-4 sm:px-6 py-3 sm:py-4 shadow-md focus-within:ring-2 ring-indigo-500 transition">

              <input
                type="text"
                placeholder="Search songs or playlists..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="bg-transparent flex-1 text-sm sm:text-base text-white placeholder-zinc-400 outline-none"
              />

              <button
                type="submit"
                className="ml-3 sm:ml-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm transition"
              >
                Search
              </button>

            </div>

          </form>

          {/* EMPTY STATE */}
          {searchText && searchResults.length === 0 && (
            <div className="text-center text-zinc-400 mt-16">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                No results found
              </h3>

              <p className="text-sm sm:text-base">
                Try different keywords or check your spelling.
              </p>
            </div>
          )}

          {/* RESULTS */}
          <div className="space-y-3 sm:space-y-4">

            {searchResults.map((item) => (
              <div
                key={item._id}
                onClick={() => {
                  if (item.owner) {
                    setPlayListId(item._id);
                    navigate("/playlist-songs");
                  } else {
                    setCurrentSong(item);
                  }
                }}
                className="group flex items-center gap-3 sm:gap-4 bg-zinc-800 hover:bg-zinc-700 p-3 sm:p-4 rounded-lg sm:rounded-xl cursor-pointer transition shadow-sm hover:shadow-md"
              >

                {/* Thumbnail */}
                <img
                  src={item.thumbNail}
                  alt={item.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-md sm:rounded-lg object-cover"
                />

                {/* Info */}
                <div className="flex-1 min-w-0">

                  <h3 className="text-white text-sm sm:text-base font-medium truncate">
                    {item.name}
                  </h3>

                  <p className="text-zinc-400 text-xs sm:text-sm">
                    {item.owner ? "Playlist" : "Song"}
                  </p>

                </div>

                {/* LIKE BUTTON */}
                {!item.owner && (
                  <FaHeart
                    onClick={(e) => handleHeartClick(e, item._id)}
                    className={`text-base sm:text-lg transition ${
                      likedSongsId.includes(item._id)
                        ? "text-red-500"
                        : "text-zinc-400 hover:text-red-400"
                    }`}
                  />
                )}

              </div>
            ))}

          </div>

        </div>
      </div>
    </MainLayout>
  );
};

export default Search;