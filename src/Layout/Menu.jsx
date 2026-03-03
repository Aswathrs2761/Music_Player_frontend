import React, { useState } from 'react';
import { IoMdHome } from "react-icons/io";
import { RiNeteaseCloudMusicLine } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { LuLibrary } from "react-icons/lu";
import { FaSquarePlus } from "react-icons/fa6";
import { FcLike } from "react-icons/fc";
import { MdLibraryMusic } from "react-icons/md";
import { BiSolidPlaylist } from "react-icons/bi";



const Menu = () => {

    return (
        <div >
      <div className="d-flex flex-column">
        <div className="row menuicon" style={{ paddingBottom: '40px' }}>
          <span style={{ fontSize: '25px', color: '#FEFFFF' }}><RiNeteaseCloudMusicLine style={{ fontSize: '35px', width: '23%' }} />Music</span>
        </div>

        <div className="row menuicon">
          <div className="col">
            <Link to='/' style={{ color: '#FEFFFF', textDecoration: 'none' }} ><span><IoMdHome style={{ fontSize: '30px', width: '36%' }} />Home</span></Link>
          </div>
        </div>

        <div className="row menuicon">
          <div className="col">
            <Link to='/search' style={{ color: '#FEFFFF', textDecoration: 'none' }}><span><FaSearch style={{ fontSize: '30px', width: '36%' }} />Search</span></Link>
          </div>
        </div>


        <div className="row menuicon">
          <div className="col">
            <Link to='/myLibrary' style={{ color: '#FEFFFF', textDecoration: 'none' }}><span><LuLibrary style={{ fontSize: '30px', width: '36%' }} />My Library</span></Link>
          </div>
        </div>

        


        <br />

        <div className="row menuicon">
          <div className="col">
            <Link to='/mymusic' style={{ color: '#FEFFFF', textDecoration: 'none' }}><span><MdLibraryMusic style={{ fontSize: '30px', width: '36%' }} />My Music</span></Link>
          </div>
        </div>

        <div className="row menuicon">
          <div className="col">
            <Link to='/myPlaylists' style={{ color: '#FEFFFF', textDecoration: 'none' }}><span><BiSolidPlaylist style={{ fontSize: '30px', width: '36%' }} />My playlists</span></Link>
          </div>
        </div>

        <div className="row menuicon">
          <div className="col">
            <Link  to='/createplaylist' style={{ color: '#FEFFFF', textDecoration: 'none' }}><span><FaSquarePlus style={{ fontSize: '30px', width: '36%' }} />Create Playlist</span></Link>
          </div>
        </div>

       



        {/* <div className="row menuicon">
          <div className="col">
            <Link to='/likedSongs'  style={{ color: '#FEFFFF', textDecoration: 'none' }}><span><FcLike style={{ fontSize: '30px', width: '36%' }} />Liked Songs</span></Link>
          </div>
        </div> */}

        
      </div>

     
    </div>
        
    );
};

export default Menu;





