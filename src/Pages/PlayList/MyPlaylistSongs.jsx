import React, { useEffect, useState } from "react";
import MainLayout from "../../Layout/MainLayout";
import axios from "axios";
import { Backend_url } from "../../utils/Config";
import { useCurrentSong } from "../../Context/SongContext";
import { useAuth } from "../../Context/AuthProvider";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const MyPlaylistSongs = () => {

  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [playlistId, setPlaylistId] = useState(null);

  const { setCurrentSong, setAllSongs } = useCurrentSong();
  const [auth] = useAuth();

  /* ---------------- FETCH PLAYLIST ---------------- */

  const getPlaylist = async (id) => {

    try {

      const { data } = await axios.get(
        `${Backend_url}/api/playlist/getplaylistbyid/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`
          }
        }
      );

      if (data.success) {
        setCurrentPlaylist(data.playList);
        setAllSongs(data.playList.songs);
      }

    } catch (error) {
      toast.error("Failed to load playlist");
    }

  };

  /* ---------------- DELETE SONG ---------------- */

  const deleteSong = async (songId) => {

    try {

      await axios.post(
        `${Backend_url}/api/playlist/deletesong`,
        { songId, playlistId },
        {
          headers: {
            Authorization: auth?.token
          }
        }
      );

      toast.success("Song removed");

      getPlaylist(playlistId);

    } catch {
      toast.error("Failed to remove song");
    }

  };

  /* ---------------- ADD SONG ---------------- */

  const addSong = async (songId) => {

    try {

      await axios.post(
        `${Backend_url}/api/playlist/addsong`,
        { songId, playlistId },
        {
          headers: {
            Authorization: auth?.token
          }
        }
      );

      toast.success("Song added");

      getPlaylist(playlistId);

    } catch {
      toast.error("Failed to add song");
    }

  };

  /* ---------------- LOAD PLAYLIST ---------------- */

  useEffect(() => {

    const storedId = JSON.parse(localStorage.getItem("currentPlaylist"));

    if (storedId) {

      setPlaylistId(storedId);

      if (auth?.token) {
        getPlaylist(storedId);
      }

    }

  }, [auth?.token]);

  /* ---------------- UI ---------------- */

  return (

    <MainLayout>

      <div className="max-w-5xl mx-auto px-4">

        {/* Header */}

        {currentPlaylist && (

          <div className="mb-8">

            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              {currentPlaylist.name}
            </h1>

            <p className="text-sm text-zinc-400 mt-1">
              {currentPlaylist.songs?.length || 0} songs
            </p>

          </div>

        )}

        {/* SONG LIST */}

        {currentPlaylist?.songs?.length > 0 ? (

          <div className="space-y-3">

            {currentPlaylist.songs.map((song) => (

              <div
                key={song._id}
                className="flex items-center justify-between bg-zinc-900 hover:bg-zinc-800 p-4 rounded-xl transition"
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

                    <p className="text-xs text-zinc-400">
                      {song.artist?.userName}
                    </p>

                  </div>

                </div>

                {/* RIGHT */}

                <button
                  onClick={() => deleteSong(song._id)}
                  className="text-red-500 hover:text-red-400"
                >
                  <Trash2 size={18} />
                </button>

              </div>

            ))}

          </div>

        ) : (

          <p className="text-zinc-500 text-sm">
            No songs in this playlist.
          </p>

        )}

      </div>

    </MainLayout>

  );

};

export default MyPlaylistSongs;