import React, { useEffect, useState } from "react";
import MainLayout from "../Layout/MainLayout";
import axios from "axios";
import { Backend_url } from "../utils/Config";
import { Link, useNavigate } from "react-router-dom";
import { useCurrentSong } from "../Context/SongContext";
import { usePlayList } from "../Context/PlaylistContextProvider";
import { useAuth } from "../Context/AuthProvider";
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

  const [auth, , authLoading] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {

    if (authLoading) return;

    if (!auth?.token) {
      navigate("/");
      return;
    }

    const fetchData = async () => {

      try {

        setLoading(true);
        setError(null);

        const config = {
          headers: {
            Authorization: `Bearer ${auth.token}`
          }
        };

        const [songsRes, playlistsRes, allSongsRes] = await Promise.all([
          axios.get(`${Backend_url}/api/song/get-songs`),
          axios.get(`${Backend_url}/api/playlist/getcretainplaylist`, config),
          axios.get(`${Backend_url}/api/song/get-allsongs`)
        ]);

        setSongs(songsRes.data.songs || []);
        setPlaylists(playlistsRes.data.playList || []);
        setAllSongs(allSongsRes.data.songs || []);

      } catch (err) {

        console.log(err);
        setError("Unable to load content. Please try again later.");

      } finally {

        setLoading(false);

      }
    };

    fetchData();

  }, [auth?.token, authLoading]);

  if (authLoading || loading) {
    return <LoadingSpinner />;
  }

  return (
    <MainLayout>

      <div className="bg-gradient-to-b from-black via-zinc-900 to-black py-8 sm:py-10 md:py-12">

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

          {error && (
            <div className="bg-red-900/30 border border-red-700 text-red-300 px-5 py-4 rounded-xl mb-10">
              {error}
            </div>
          )}

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


/* ---------- SECTION ---------- */

const Section = ({ title, link, children }) => (

  <section className="mb-16 md:mb-20">

    <div className="flex items-center justify-between mb-6">

      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">
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

  </section>

);


/* ---------- GRID ---------- */

const CardGrid = ({ children }) => (

  <div
    className="
      grid
      gap-4 sm:gap-6
      grid-cols-2
      sm:grid-cols-3
      md:grid-cols-4
      lg:grid-cols-4
      xl:grid-cols-5
      2xl:grid-cols-6
    "
  >
    {children}
  </div>

);

export default HomePage;