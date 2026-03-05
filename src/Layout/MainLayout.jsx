import React, { useEffect } from "react";
import Menu from "../Layout/Menu";
import AuthMenu from "../Layout/AuthMenu";
import axios from "axios";
import { useAuth } from "../Context/AuthProvider";
import { Backend_url } from "../utils/Config";
import { useCurrentSong } from "../Context/SongContext";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
  const [auth] = useAuth();
  const { currentSong } = useCurrentSong();

  const getMyMusic = async () => {
    try {
      await axios.get(`${Backend_url}/api/song/get-allsongs`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getMyMusic();
    }
  }, [auth?.token]);

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">

      {/* Sidebar */}
      <Menu />

      {/* Main Content */}
      <div className="flex flex-col flex-1">

        {/* Top Navbar */}
        <div className="h-14 sm:h-16 flex items-center justify-end px-4 sm:px-6 border-b border-zinc-800 bg-zinc-950">
          <AuthMenu />
        </div>

        {/* Page Content */}
        <div
          className={`flex-1 overflow-y-auto p-4 sm:p-6 ${
            currentSong ? "pb-24 sm:pb-28" : ""
          }`}
        >
          {children}
        </div>

        {/* Music Player */}
        {currentSong && <Footer />}
      </div>

    </div>
  );
};

export default MainLayout;