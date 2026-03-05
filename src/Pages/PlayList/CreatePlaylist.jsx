import React, { useEffect, useState } from "react";
import axios from "axios";
import { Backend_url } from "../../utils/Config";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../Layout/MainLayout";
import { useAuth } from "../../Context/AuthProvider";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

const CreatePlaylist = () => {

  const [playlistName, setPlaylistName] = useState("");
  const [thumbNail, setThumbNail] = useState("");
  const [playlistId, setPlaylistId] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [selectedSongs, setSelectedSongs] = useState([]);

  const [auth] = useAuth();
  const navigate = useNavigate();

  /* ---------------- CREATE PLAYLIST ---------------- */

  const createPlaylist = async () => {

    if (!playlistName.trim()) {
      toast.error("Playlist name required");
      return;
    }

    try {

      const { data } = await axios.post(
        `${Backend_url}/api/playlist/create-playlist`,
        {
          name: playlistName,
          thumbNail,
          songs: []
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`
          }
        }
      );

      setPlaylistId(data.newPlaylist._id);

      toast.success("Playlist created 🎉");

    } catch (error) {

      toast.error("Failed to create playlist");

    }

  };

  /* ---------------- ADD SONG ---------------- */

  const addSongToPlaylist = async (song) => {

    if (!playlistId) {
      toast.error("Create playlist first");
      return;
    }

    try {

      await axios.post(
        `${Backend_url}/api/playlist/addsong`,
        {
          playlistId,
          songId: song._id
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`
          }
        }
      );

      setSelectedSongs((prev) => [...prev, song]);

      toast.success("Song added");

    } catch {

      toast.error("Failed to add song");

    }

  };

  /* ---------------- REMOVE SONG ---------------- */

  const removeSong = (id) => {

    setSelectedSongs(prev =>
      prev.filter(song => song._id !== id)
    );

  };

  /* ---------------- SEARCH SONG ---------------- */

  const searchSongs = async (text) => {

    if (!text.trim()) {
      setSearchResults([]);
      return;
    }

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

      toast.error("Login required");
      navigate("/");

    }

  }, [auth]);

  /* ---------------- UI ---------------- */

  return (

    <MainLayout>

      <div className="max-w-6xl mx-auto px-4">

        {/* TITLE */}

        <h1 className="text-2xl md:text-3xl font-bold mb-8">
          Create Playlist
        </h1>

        {/* PLAYLIST DETAILS */}

        <div className="grid md:grid-cols-2 gap-6 mb-10">

          <div>

            <label className="text-sm text-zinc-400">
              Playlist Name
            </label>

            <input
              type="text"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              className="w-full mt-2 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="My playlist"
            />

          </div>

          <div>

            <label className="text-sm text-zinc-400">
              Thumbnail URL
            </label>

            <input
              type="text"
              value={thumbNail}
              onChange={(e) => setThumbNail(e.target.value)}
              className="w-full mt-2 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Paste image URL"
            />

          </div>

        </div>

        {/* CREATE BUTTON */}

        {!playlistId && (

          <button
            onClick={createPlaylist}
            className="mb-10 bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-full font-medium transition"
          >
            Create Playlist
          </button>

        )}

        {/* SEARCH */}

        {playlistId && (

          <>
            <h2 className="text-lg font-semibold mb-3">
              Search Songs
            </h2>

            <input
              type="text"
              value={searchText}
              onChange={handleSearchChange}
              placeholder="Search songs..."
              className="w-full mb-6 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            {/* SEARCH RESULTS */}

            <div className="space-y-3 mb-10">

              {searchResults.map(song => (

                <div
                  key={song._id}
                  className="flex justify-between items-center bg-zinc-900 hover:bg-zinc-800 p-4 rounded-lg"
                >

                  <div className="flex items-center gap-4">

                    <img
                      src={song.thumbNail}
                      alt={song.name}
                      className="w-12 h-12 rounded-md object-cover"
                    />

                    <div>

                      <p className="text-white font-medium">
                        {song.name}
                      </p>

                      <p className="text-xs text-zinc-400">
                        {song.artist?.userName}
                      </p>

                    </div>

                  </div>

                  <button
                    onClick={() => addSongToPlaylist(song)}
                    className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-full text-sm"
                  >
                    Add
                  </button>

                </div>

              ))}

            </div>

            {/* SELECTED SONGS */}

            {selectedSongs.length > 0 && (

              <>
                <h2 className="text-lg font-semibold mb-4">
                  Songs in Playlist
                </h2>

                <div className="space-y-3">

                  {selectedSongs.map(song => (

                    <div
                      key={song._id}
                      className="flex justify-between items-center bg-zinc-900 p-4 rounded-lg"
                    >

                      <div className="flex items-center gap-4">

                        <img
                          src={song.thumbNail}
                          alt={song.name}
                          className="w-12 h-12 rounded-md object-cover"
                        />

                        <div>

                          <p className="text-white">
                            {song.name}
                          </p>

                          <p className="text-xs text-zinc-400">
                            {song.artist?.userName}
                          </p>

                        </div>

                      </div>

                      <button
                        onClick={() => removeSong(song._id)}
                        className="text-red-500 hover:text-red-400"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                  ))}

                </div>

                {/* SUBMIT BUTTON */}

                <button
                  onClick={() => navigate("/myPlaylists")}
                  className="mt-8 bg-green-600 hover:bg-green-700 px-8 py-3 rounded-full font-medium transition"
                >
                  Save Playlist
                </button>

              </>

            )}

          </>

        )}

      </div>

    </MainLayout>

  );

};

export default CreatePlaylist;