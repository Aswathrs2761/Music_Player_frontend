import React, { useEffect, useState } from "react";
import MainLayout from "../../Layout/MainLayout";
import axios from "axios";
import { Backend_url } from "../../utils/Config";
import { useCurrentSong } from "../../Context/SongContext";
import { MdModeEdit } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { Trash2 } from "lucide-react";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";

const MyPlaylistSongs = () => {
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [playlistId, setPlaylistId] = useState(null);

  const [editingName, setEditingName] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");

  const [addMore, setAddMore] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [likedSongsId, setLikedSongsId] = useState([]);

  const { setCurrentSong, setAllSongs } = useCurrentSong();

  /* ---------------- FETCH PLAYLIST ---------------- */

  const getPlaylist = async (id) => {
    try {
      const { data } = await axios.get(
        `${Backend_url}/api/playlist/getplaylistbyid/${id}`
      );
      setCurrentPlaylist(data.playList);
      setAllSongs(data.playList.songs);
    } catch {
      toast.error("Failed to load playlist");
    }
  };

  /* ---------------- GET LIKED SONGS ---------------- */

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

  useEffect(() => {
    const storedId = JSON.parse(localStorage.getItem("currentPlaylist"));
    if (storedId) {
      setPlaylistId(storedId);
      getPlaylist(storedId);
    }

    getLikedSongs();
  }, []);

  /* ---------------- DELETE SONG ---------------- */

  const deleteSong = async (id) => {
    try {
      await axios.post(
        `${Backend_url}/api/playlist/deletesong`,
        { songId: id, playlistId }
      );

      toast.success("Song removed");
      getPlaylist(playlistId);
    } catch {
      toast.error("Failed to remove song");
    }
  };

  /* ---------------- ADD SONG ---------------- */

  const addSong = async (id) => {
    try {
      await axios.post(
        `${Backend_url}/api/playlist/addsong`,
        { songId: id, playlistId }
      );

      toast.success("Song added");
      getPlaylist(playlistId);
    } catch {
      toast.error("Failed to add song");
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        {currentPlaylist && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">
              {currentPlaylist.name}
            </h1>
          </div>
        )}

        {/* SONG LIST */}
        {currentPlaylist?.songs?.length > 0 ? (
          <div className="space-y-3">
            {currentPlaylist.songs.map((song) => (
              <div
                key={song._id}
                className="flex items-center justify-between bg-zinc-900 hover:bg-zinc-800 p-4 rounded-xl transition group"
              >
                {/* LEFT */}
                <div
                  onClick={() => setCurrentSong(song)}
                  className="flex items-center gap-4 cursor-pointer"
                >
                  <img
                    src={song.thumbNail}
                    alt={song.name}
                    className="w-12 h-12 rounded-md object-cover"
                  />

                  <div>
                    <p className="text-white font-medium">
                      {song.name}
                    </p>
                    {/* <p className="text-sm text-zinc-400">
                      {song.artist?.userName}
                    </p> */}
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-6">

                  {/* LIKE BUTTON */}
                  <FaHeart
                    onClick={() => toggleLike(song._id)}
                    className="cursor-pointer transition"
                    size={18}
                    color={
                      likedSongsId.includes(song._id)
                        ? "red"
                        : "#71717a"
                    }
                  />

                  {/* DELETE */}
                  <button
                    onClick={() => deleteSong(song._id)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-zinc-500">
            No songs in this playlist.
          </p>
        )}

      </div>
    </MainLayout>
  );
};

export default MyPlaylistSongs;