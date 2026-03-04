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
  const [auth, setAuth] = useAuth();

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
      setSearchResults([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchSongs(searchText);
  };

  /* ---------------- LIKES ---------------- */

  const addOrRemoveLikes = async (newlikedarray) => {
    try {
      await axios.post(
        `${Backend_url}/api/user/addorremovelikes`,
        { newlikedarray }
      );
    } catch (error) {}
  };

  const handleHeartClick = (e, songId) => {
    e.stopPropagation();

    const index = likedSongsId.indexOf(songId);

    if (index === -1) {
      const newLiked = [...likedSongsId, songId];
      setLikedSongsId(newLiked);
      addOrRemoveLikes(newLiked);
    } else {
      const updated = likedSongsId.filter((id) => id !== songId);
      setLikedSongsId(updated);
      addOrRemoveLikes(updated);
    }
  };

  /* ---------------- AUTH CHECK ---------------- */

  useEffect(() => {
    if (!auth?.token) {
      navigate("/login");
    }
  }, [auth, navigate]);

  /* ---------------- UI ---------------- */

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black px-6 py-12">

        <div className="max-w-4xl mx-auto">

          {/* SEARCH BAR */}
          <form onSubmit={handleSubmit} className="mb-12">
            <div className="flex items-center bg-zinc-800 rounded-full px-6 py-4 shadow-md focus-within:ring-2 ring-indigo-500 transition">
              <input
                type="text"
                placeholder="Search songs or playlists..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="bg-transparent flex-1 text-white placeholder-zinc-400 outline-none"
              />

              <button
                type="submit"
                className="ml-4 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full text-sm transition"
              >
                Search
              </button>
            </div>
          </form>

          {/* EMPTY STATE */}
          {searchText && searchResults.length === 0 && (
            <div className="text-center text-zinc-400 mt-20">
              <h3 className="text-xl font-semibold mb-2">
                No results found
              </h3>
              <p>
                Try different keywords or check your spelling.
              </p>
            </div>
          )}

          {/* RESULTS */}
          <div className="space-y-4">
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
                className="group flex items-center gap-4 bg-zinc-800 hover:bg-zinc-700 p-4 rounded-xl cursor-pointer transition shadow-sm hover:shadow-md"
              >
                {/* Thumbnail */}
                <img
                  src={item.thumbNail}
                  alt={item.name}
                  className="w-14 h-14 rounded-lg object-cover"
                />

                {/* Info */}
                <div className="flex-1">
                  <h3 className="text-white font-medium truncate">
                    {item.name}
                  </h3>
                  <p className="text-zinc-400 text-sm truncate">
                    {item.owner ? "Playlist" : "Song"}
                  </p>
                </div>

                {/* Heart */}
                {!item.owner && (
                  <FaHeart
                    onClick={(e) =>
                      handleHeartClick(e, item._id)
                    }
                    className={`text-lg transition ${
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