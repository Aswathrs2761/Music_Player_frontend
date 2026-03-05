import React, { useEffect, useState } from "react";
import MainLayout from "../../Layout/MainLayout";
import axios from "axios";
import { Backend_url } from "../../utils/Config";
import { useNavigate } from "react-router-dom";
import { usePlayList } from "../../Context/PlaylistContextProvider";
import toast from "react-hot-toast";

const AllPlaylist = () => {
  const navigate = useNavigate();
  const { setPlayListId } = usePlayList();

  const [allPlaylists, setAllPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllPlaylist = async () => {
    try {
      const { data } = await axios.get(
        `${Backend_url}/api/playlist/getallplaylist`
      );

      setAllPlaylists(data.playlist || []);
    } catch (error) {
      toast.error("Failed to load playlists");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPlaylist();
  }, []);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-2 sm:px-4">

        {/* Page Header */}
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
          All Playlists
        </h1>

        {/* Loading State */}
        {loading && (
          <div className="text-zinc-400 text-sm sm:text-base">
            Loading playlists...
          </div>
        )}

        {/* Empty State */}
        {!loading && allPlaylists.length === 0 && (
          <div className="text-zinc-500 text-sm sm:text-base">
            No playlists available.
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">

          {allPlaylists.map((playlist) => (
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
              className="bg-zinc-900 hover:bg-zinc-800 transition-all duration-300 rounded-lg sm:rounded-xl p-3 sm:p-4 cursor-pointer group"
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden rounded-md sm:rounded-lg mb-2 sm:mb-3">
                <img
                  src={playlist.thumbNail}
                  alt={playlist.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              {/* Title */}
              <h3 className="text-white font-semibold text-xs sm:text-sm truncate">
                {playlist.name}
              </h3>
            </div>
          ))}

        </div>
      </div>
    </MainLayout>
  );
};

export default AllPlaylist;