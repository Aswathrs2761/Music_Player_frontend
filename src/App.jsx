import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'

import NotFound from './Pages/NotFound';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import ForgotPassword from './Auth/ForgotPassword';
import HomePage from './Pages/HomePage';
import { AuthProvider } from './Context/AuthProvider';
import UploadSong from './Pages/Songs/UploadSong';
import Mymusic from './Pages/Songs/Mymusic';
import Footer from './Layout/Footer';
import MainLayout from './Layout/MainLayout';
import AllSongs from './Pages/Songs/AllSongs';
import Logout from './Auth/Logout';
import Search from './Pages/Search';
import CreatePlaylist from './Pages/PlayList/CreatePlaylist';
import MyPlaylistPage from './Pages/PlayList/MyPlaylistPage';
import MyPlaylistSongs from './Pages/PlayList/MyPlaylistSongs';
import PlayListSongs from './Pages/PlayList/PlayListSongs';
import MyLibrary from './Pages/MyLibrary';
import LikedSongs from './Pages/Songs/LikedSongs';
import AllPlaylist from './Pages/PlayList/AllPlaylist';


const App = () => {
  return (
    <div>
    

      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/uploadsong' element={<UploadSong />} />
        <Route path='/mymusic' element={<Mymusic />} />
        <Route path='/allsongs' element={<AllSongs />} />
        <Route path='/allplaylists' element={<AllPlaylist/> } />
        <Route path='/playlist-songs' element={<PlayListSongs /> }/>
        <Route path='/logout' element={<Logout />} />
        <Route path='/search' element={<Search />} />
        <Route path='/createplaylist' element={<CreatePlaylist />} />
        <Route path='/myPlaylists' element={<MyPlaylistPage />} />
        <Route path='/playlistsongs' element={<MyPlaylistSongs /> } />
        <Route path='/mylibrary' element={<MyLibrary /> } />
        <Route path='/likedsongs' element={<LikedSongs /> } />




        
      </Routes>

    


    </div>
  );
};

export default App;