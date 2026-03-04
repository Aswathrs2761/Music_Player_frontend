import React, { useEffect, useState } from "react";
import MainLayout from "../../Layout/MainLayout";
import axios from "axios";
import { Backend_url } from "../../utils/Config";
import { useAuth } from "../../Context/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

const MyPlaylistPage = () => {
  const [myPlaylist, setMyPlaylist] = useState([]);
  const [loading, setLoading] = useState(true);

  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  /* ---------------- FETCH PLAYLISTS ---------------- */

  const getMyPlaylists = async () => {
    try {
      const { data } = await axios.get(
        `${Backend_url}/api/playlist/getplaylist/artist`
      );

      setMyPlaylist(data.playList || []);
    } catch (error) {
      toast.error("Failed to load playlists");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- DELETE ---------------- */

  const deletePlaylist = async (id) => {
    try {
      await axios.delete(
        `${Backend_url}/api/playlist/deleteplaylist/${id}`
      );

      setMyPlaylist((prev) =>
        prev.filter((playlist) => playlist._id !== id)
      );

      toast.success("Playlist deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  /* ---------------- AUTH CHECK ---------------- */

  useEffect(() => {
    if (auth?.token) {
      getMyPlaylists();
    } else {
      const localData = localStorage.getItem("auth");

      if (localData) {
        const parsed = JSON.parse(localData);
        setAuth({
          ...auth,
          user: parsed.user,
          token: parsed.token,
        });
      } else {
        navigate("/login");
      }
    }
  }, [auth?.token]);

  /* ---------------- UI ---------------- */

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">

        <h1 className="text-2xl font-bold mb-8">
          My Playlists
        </h1>

        {loading && (
          <p className="text-zinc-400">
            Loading playlists...
          </p>
        )}

        {!loading && myPlaylist.length === 0 && (
          <p className="text-zinc-500">
            You haven’t created any playlists yet.
          </p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

          {myPlaylist.map((playlist) => (
            <div
              key={playlist._id}
              className="bg-zinc-900 hover:bg-zinc-800 transition rounded-xl p-4 group relative"
            >
              {/* Delete Button */}
              <button
                onClick={() => deletePlaylist(playlist._id)}
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition text-red-500 hover:text-red-400"
              >
                <Trash2 size={18} />
              </button>

              {/* Click Area */}
              <div
                onClick={() => {
                  localStorage.setItem(
                    "currentPlaylist",
                    JSON.stringify(playlist._id)
                  );
                  navigate("/playlistsongs");
                }}
                className="cursor-pointer"
              >
                <div className="aspect-square overflow-hidden rounded-lg mb-3">
                  <img
                    src={playlist.thumbNail}
                    alt={playlist.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>

                <h3 className="text-white font-semibold text-sm truncate">
                  {playlist.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default MyPlaylistPage;