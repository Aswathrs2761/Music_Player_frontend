import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import NotFound from "./Pages/NotFound";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import ForgotPassword from "./Auth/ForgotPassword";
import HomePage from "./Pages/HomePage";
import UploadSong from "./Pages/Songs/UploadSong";
import Mymusic from "./Pages/Songs/Mymusic";
import AllSongs from "./Pages/Songs/AllSongs";
import Logout from "./Auth/Logout";
import Search from "./Pages/Search";
import CreatePlaylist from "./Pages/PlayList/CreatePlaylist";
import MyPlaylistPage from "./Pages/PlayList/MyPlaylistPage";
import MyPlaylistSongs from "./Pages/PlayList/MyPlaylistSongs";
import PlayListSongs from "./Pages/PlayList/PlayListSongs";
import MyLibrary from "./Pages/MyLibrary";
import LikedSongs from "./Pages/Songs/LikedSongs";
import AllPlaylist from "./Pages/PlayList/AllPlaylist";
import ResetPassword from "./Auth/ResetPassword";

const App = () => {
  return (
    <>
      {/* Global Toast System */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#1e293b",
            color: "#fff",
            borderRadius: "10px",
          },
        }}
      />

      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword/:userId/:token" element={<ResetPassword />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/uploadsong" element={<UploadSong />} />
        <Route path="/mymusic" element={<Mymusic />} />
        <Route path="/allsongs" element={<AllSongs />} />
        <Route path="/allplaylists" element={<AllPlaylist />} />
        <Route path="/playlist-songs" element={<PlayListSongs />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/search" element={<Search />} />
        <Route path="/createplaylist" element={<CreatePlaylist />} />
        <Route path="/myPlaylists" element={<MyPlaylistPage />} />
        <Route path="/playlistsongs" element={<MyPlaylistSongs />} />
        <Route path="/mylibrary" element={<MyLibrary />} />
        <Route path="/likedsongs" element={<LikedSongs />} />
      </Routes>
    </>
  );
};

export default App;