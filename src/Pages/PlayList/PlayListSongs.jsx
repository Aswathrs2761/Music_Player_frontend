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
        `${Backend_url}/api/playlist/getplaylistbyid/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`
          }
        }
      );

      if (data?.success) {

        setSongs(data.playList.songs);
        setAllSongs(data.playList.songs);
        setPlaylistDetails(data.playList);

      }

    } catch (error) {

      console.log(error);
      toast.error("Failed to load playlist");

    } finally {
      setLoading(false);
    }

  };

  /* ---------------- LOAD PLAYLIST ---------------- */

  useEffect(() => {

    if (!auth?.token) return;

    const storedId = JSON.parse(localStorage.getItem("currentPlaylist"));

    const idToUse = playListId || storedId;

    if (idToUse) {

      setPlayListId(idToUse);
      getPlaylistSongs(idToUse);

    }

  }, [playListId, auth?.token]);

  /* ---------------- GET LIKED SONGS ---------------- */

  const getLikedSongs = async () => {

    try {

      const { data } = await axios.get(
        `${Backend_url}/api/user/getlikedsongs`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`
          }
        }
      );

      const ids =
        data?.userLikedSongs?.likedSongs?.map(song => song._id) || [];

      setLikedSongsId(ids);

    } catch {}

  };

  /* ---------------- UPDATE LIKES ---------------- */

  const updateLikes = async (newArray) => {

    try {

      await axios.post(
        `${Backend_url}/api/user/addorremovelikes`,
        { newlikedarray: newArray },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`
          }
        }
      );

    } catch {}

  };

  const handleHeartClick = (e, songId) => {

    e.stopPropagation();

    let updated;

    if (likedSongsId.includes(songId)) {

      updated = likedSongsId.filter(id => id !== songId);

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
        `${Backend_url}/api/user/getlikedplaylist`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`
          }
        }
      );

      setLikedPlaylistArray(
        data?.LikedPlaylistId?.likedPlaylists || []
      );

    } catch {}

  };

  const togglePlaylistLike = async () => {

    try {

      if (likedPlaylistArray.includes(playlistDetails._id)) {

        await axios.post(
          `${Backend_url}/api/user/removelikedplaylist`,
          { playlistId: playlistDetails._id },
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`
            }
          }
        );

      } else {

        await axios.post(
          `${Backend_url}/api/user/addlikedplaylist`,
          { playlistId: playlistDetails._id },
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`
            }
          }
        );

      }

      getLikedPlaylist();

    } catch {}

  };

  /* ---------------- INITIAL LOAD ---------------- */

  useEffect(() => {

    if (!auth?.token) return;

    getLikedSongs();
    getLikedPlaylist();

  }, [auth?.token]);

  /* ---------------- UI ---------------- */

  return (

    <MainLayout>

      <div className="max-w-6xl mx-auto px-2 sm:px-4">

        {/* HEADER */}

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
            {playlistDetails?.name}
          </h1>

        </div>

        {/* LOADING */}

        {loading && (
          <p className="text-zinc-500 text-sm sm:text-base">
            Loading songs...
          </p>
        )}

        {/* EMPTY STATE */}

        {!loading && songs.length === 0 && (
          <p className="text-zinc-500 text-sm sm:text-base">
            No songs in this playlist.
          </p>
        )}

        {/* SONG LIST */}

        <div className="space-y-2 sm:space-y-3">

          {songs.map(song => (

            <div
              key={song._id}
              onClick={() => setCurrentSong(song)}
              className="flex justify-between items-center bg-zinc-900 hover:bg-zinc-800 p-3 sm:p-4 rounded-lg transition cursor-pointer"
            >

              <div className="flex items-center gap-3 sm:gap-4 min-w-0">

                <img
                  src={song.thumbNail}
                  alt={song.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-md object-cover"
                />

                <div className="min-w-0">

                  <p className="text-white text-sm sm:text-base font-medium truncate max-w-[150px] sm:max-w-xs">
                    {song.name}
                  </p>

                  <p className="text-xs sm:text-sm text-zinc-400">
                    {song.artist?.userName}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4 sm:gap-6">

                <span className="text-xs sm:text-sm text-zinc-400">
                  {song.duration}
                </span>

                <FaHeart
                  onClick={(e) => handleHeartClick(e, song._id)}
                  className={`text-base sm:text-lg transition ${
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