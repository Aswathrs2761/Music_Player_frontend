import React, { useEffect, useState } from "react";
import MainLayout from "../Layout/MainLayout";
import axios from "axios";
import { Backend_url } from "../utils/Config";
import { Link, useNavigate } from "react-router-dom";
import { useCurrentSong } from "../Context/SongContext";
import { usePlayList } from "../Context/PlaylistContextProvider";
import SongCard from "../Components/SongCard";
import PlaylistCard from "../Components/PlaylistCard";
import LoadingSpinner from "../Components/LoadingSpinner";

const HomePage = () => {
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { setCurrentSong, setAllSongs } = useCurrentSong();
  const { setPlayListId } = usePlayList();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [songsRes, playlistsRes, allSongsRes] = await Promise.all([
          axios.get(`${Backend_url}/api/song/get-songs`),
          axios.get(`${Backend_url}/api/playlist/getcretainplaylist`),
          axios.get(`${Backend_url}/api/song/get-allsongs`),
        ]);

        setSongs(songsRes.data.songs || []);
        setPlaylists(playlistsRes.data.playList || []);
        setAllSongs(allSongsRes.data.songs || []);
      } catch (err) {
        setError("Unable to load content. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setAllSongs]);

  if (loading) return <LoadingSpinner />;

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black px-8 py-12">

        <div className="max-w-7xl mx-auto">

          {/* HERO SECTION */}
          {/* <div className="mb-20 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-12 shadow-2xl relative overflow-hidden">

            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                Discover Your Next Favorite Song
              </h1>

              <p className="text-white/80 text-lg max-w-2xl">
                Explore trending tracks, curated playlists, and personalized
                music experiences — all in one place.
              </p>
            </div>
          </div> */}

          {error && (
            <div className="bg-red-900/30 border border-red-700 text-red-300 px-6 py-4 rounded-xl mb-12">
              {error}
            </div>
          )}

          {/* TRENDING SONGS */}
          <Section title="🔥 Trending Songs" link="/allsongs">
            <CardGrid>
              {songs.map((song) => (
                <SongCard
                  key={song._id}
                  song={song}
                  onClick={() => setCurrentSong(song)}
                />
              ))}
            </CardGrid>
          </Section>

          {/* PLAYLISTS */}
          <Section title="🎶 Your Playlists" link="/allplaylists">
            <CardGrid>
              {playlists.map((pl) => (
                <PlaylistCard
                  key={pl._id}
                  playList={pl}
                  onClick={() => {
                    localStorage.setItem(
                      "currentPlaylist",
                      JSON.stringify(pl._id)
                    );
                    setPlayListId(pl._id);
                    navigate("/playlist-songs");
                  }}
                />
              ))}
            </CardGrid>
          </Section>

        </div>
      </div>
    </MainLayout>
  );
};

/* ---------- SECTION COMPONENT ---------- */

const Section = ({ title, link, children }) => (
  <div className="mb-24">
    <div className="flex justify-between items-center mb-10">
      <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
        {title}
      </h2>

      <Link
        to={link}
        className="text-sm text-zinc-400 hover:text-white transition !no-underline"
      >
        View All →
      </Link>
    </div>

    {children}
  </div>
);

/* ---------- RESPONSIVE GRID ---------- */

const CardGrid = ({ children }) => (
  <div className="grid gap-8 
                  grid-cols-2 
                  sm:grid-cols-3 
                  md:grid-cols-4 
                  lg:grid-cols-5 
                  xl:grid-cols-6">
    {children}
  </div>
);

export default HomePage;