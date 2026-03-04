import React, { useEffect, useState } from "react";
import axios from "axios";
import { Backend_url } from "../../utils/Config";
import { useNavigate } from "react-router-dom";
import { useCurrentSong } from "../../Context/SongContext";
import MainLayout from "../../Layout/MainLayout";
import { useAuth } from "../../Context/AuthProvider";
import toast from "react-hot-toast";

const CreatePlaylist = () => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistId, setPlaylistId] = useState(null);
  const [thumbNail, setThumbNail] = useState("");

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [addedSongs, setAddedSongs] = useState([]);

  const { setCurrentSong } = useCurrentSong();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  /* ---------------- CREATE OR ADD SONG ---------------- */

  const createOrAddSong = async (songId) => {
    if (!playlistName.trim()) {
      toast.error("Please enter playlist name");
      return;
    }

    try {
      if (!playlistId) {
        const { data } = await axios.post(
          `${Backend_url}/api/playlist/create-playlist`,
          {
            songs: songId,
            name: playlistName,
            thumbNail,
          }
        );

        setPlaylistId(data.newPlaylist._id);
        toast.success("Playlist created 🎉");
      } else {
        await axios.post(
          `${Backend_url}/api/playlist/addsong`,
          {
            songId,
            playlistId,
          }
        );
      }

      setAddedSongs((prev) => [...prev, songId]);
      toast.success("Song added");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  /* ---------------- SEARCH ---------------- */

  const searchSongs = async (text) => {
    try {
      const { data } = await axios.post(
        `${Backend_url}/api/song/search-only-songs`,
        { searchText: text }
      );

      if (data.success) {
        setSearchResults(data.result);
      } else {
        setSearchResults([]);
      }
    } catch {
      setSearchResults([]);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    searchSongs(value);
  };

  /* ---------------- AUTH CHECK ---------------- */

  useEffect(() => {
    if (!auth?.token) {
      const localData = localStorage.getItem("auth");

      if (localData) {
        const parsed = JSON.parse(localData);
        setAuth({
          ...auth,
          user: parsed.user,
          token: parsed.token,
        });
      } else {
        toast("Login required");
        navigate("/login");
      }
    }
  }, [auth]);

  /* ---------------- UI ---------------- */

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">

        <h1 className="text-2xl font-bold mb-8">
          Create Playlist
        </h1>

        {/* Playlist Name */}
        <div className="mb-6">
          <label className="block text-sm text-zinc-400 mb-2">
            Playlist Name
          </label>
          <input
            type="text"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            disabled={playlistId}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="My awesome playlist"
          />
        </div>

        {/* Thumbnail */}
        <div className="mb-8">
          <label className="block text-sm text-zinc-400 mb-2">
            Thumbnail URL
          </label>
          <input
            type="text"
            value={thumbNail}
            onChange={(e) => setThumbNail(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Paste image URL"
          />
        </div>

        {/* Search Section */}
        <h2 className="text-lg font-semibold mb-4">
          Find songs for your playlist
        </h2>

        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Search songs..."
          className="w-full mb-6 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />

        {/* No Results */}
        {searchResults.length === 0 && searchText.trim() !== "" && (
          <div className="text-zinc-500 text-center py-12">
            No results found for "{searchText}"
          </div>
        )}

        {/* Results */}
        <div className="space-y-3">
          {searchResults.map((song) => (
            <div
              key={song._id}
              className="flex items-center justify-between bg-zinc-900 hover:bg-zinc-800 p-4 rounded-lg transition"
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
                  <p className="text-sm text-zinc-400">
                    {song.artist?.userName}
                  </p>
                </div>
              </div>

              <button
                onClick={() => createOrAddSong(song._id)}
                disabled={addedSongs.includes(song._id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  addedSongs.includes(song._id)
                    ? "bg-green-600 text-white cursor-default"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
              >
                {addedSongs.includes(song._id) ? "Added" : "Add"}
              </button>
            </div>
          ))}
        </div>

      </div>
    </MainLayout>
  );
};

export default CreatePlaylist;