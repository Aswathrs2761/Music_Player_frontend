import React, { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../../Layout/MainLayout";
import { useCurrentSong } from "../../Context/SongContext";
import { usePlayList } from "../../Context/PlaylistContextProvider";
import { Backend_url } from "../../utils/Config";
import { FaHeart } from "react-icons/fa";
import { useAuth } from "../../Context/AuthProvider";
import toast from "react-hot-toast";

const PlayListSongs = () => {
  const { setCurrentSong, setAllSongs } = useCurrentSong();
  const { playListId, setPlayListId } = usePlayList();
  const [auth] = useAuth();

  const [songs, setSongs] = useState([]);
  const [playlistDetails, setPlaylistDetails] = useState({});
  const [likedSongsId, setLikedSongsId] = useState([]);
  const [likedPlaylistArray, setLikedPlaylistArray] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH PLAYLIST ---------------- */

  const getPlaylistSongs = async (id) => {
    try {
      const { data } = await axios.get(
        `${Backend_url}/api/playlist/getplaylistbyid/${id}`
      );

      setSongs(data.playList.songs);
      setAllSongs(data.playList.songs);
      setPlaylistDetails(data.playList);
    } catch {
      toast.error("Failed to load playlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedId = JSON.parse(
      localStorage.getItem("currentPlaylist")
    );

    const idToUse = playListId || storedId;

    if (idToUse) {
      setPlayListId(idToUse);
      getPlaylistSongs(idToUse);
    }
  }, [playListId]);

  /* ---------------- LIKED SONGS ---------------- */

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

  const updateLikes = async (newArray) => {
    try {
      await axios.post(
        `${Backend_url}/api/user/addorremovelikes`,
        { newlikedarray: newArray }
      );
    } catch {}
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
    updateLikes(updated);
  };

  /* ---------------- LIKED PLAYLIST ---------------- */

  const getLikedPlaylist = async () => {
    try {
      const { data } = await axios.get(
        `${Backend_url}/api/user/getlikedplaylist`
      );

      setLikedPlaylistArray(
        data.LikedPlaylistId?.likedPlaylists || []
      );
    } catch {}
  };

  const togglePlaylistLike = async () => {
    try {
      if (likedPlaylistArray.includes(playlistDetails._id)) {
        await axios.post(
          `${Backend_url}/api/user/removelikedplaylist`,
          { playlistId: playlistDetails._id }
        );
      } else {
        await axios.post(
          `${Backend_url}/api/user/addlikedplaylist`,
          { playlistId: playlistDetails._id }
        );
      }

      getLikedPlaylist();
    } catch {}
  };

  useEffect(() => {
    if (auth?.token) {
      getLikedSongs();
      getLikedPlaylist();
    }
  }, [auth?.token]);

  /* ---------------- UI ---------------- */

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            {playlistDetails.name}
          </h1>

          <button
            onClick={togglePlaylistLike}
            className="flex flex-col items-center text-sm"
          >
            <FaHeart
              className={`text-2xl transition ${
                likedPlaylistArray.includes(
                  playlistDetails._id
                )
                  ? "text-red-500"
                  : "text-zinc-400 hover:text-white"
              }`}
            />
            <span className="text-zinc-400 mt-1">
              {likedPlaylistArray.includes(
                playlistDetails._id
              )
                ? "Liked"
                : "Like"}
            </span>
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-zinc-500">
            Loading songs...
          </p>
        )}

        {/* EMPTY STATE */}
        {!loading && songs.length === 0 && (
          <p className="text-zinc-500">
            No songs in this playlist.
          </p>
        )}

        {/* SONG LIST */}
        <div className="space-y-3">
          {songs.map((song) => (
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
                  <p className="text-white font-medium">
                    {song.name}
                  </p>
                  <p className="text-sm text-zinc-400">
                    {song.artist?.userName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <span className="text-sm text-zinc-400">
                  {song.duration}
                </span>

                <FaHeart
                  onClick={(e) =>
                    handleHeartClick(e, song._id)
                  }
                  className={`text-lg transition ${
                    likedSongsId.includes(song._id)
                      ? "text-red-500"
                      : "text-zinc-400 hover:text-white"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </MainLayout>
  );
};

export default PlayListSongs;