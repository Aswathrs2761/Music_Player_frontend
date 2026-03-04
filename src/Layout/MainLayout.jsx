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
      const res = await axios.get(
        `${Backend_url}/api/song/get-allsongs`
      );

      if (!res.data.success) return;
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
      <div className="w-64 bg-zinc-950 border-r border-zinc-800 flex-shrink-0">
        <Menu />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">

        {/* Top Auth Menu */}
        <div className="h-16 flex items-center justify-end px-6 border-b border-zinc-800 bg-zinc-950">
          <AuthMenu />
        </div>

        {/* Scrollable Page Content */}
        <div
          className={`flex-1 overflow-y-auto p-6 ${
            currentSong ? "pb-24" : ""
          }`}
        >
          {children}
        </div>

        {/* Footer Player */}
        {currentSong && <Footer />}
      </div>
    </div>
  );
};

export default MainLayout;