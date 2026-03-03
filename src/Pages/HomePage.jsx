// import React from 'react';
// import Menu from '../Layout/Menu';
// import AuthMenu from '../Layout/AuthMenu';

// const HomePage = () => {
//     return (
//         <div className='home' >
//             <div>

//                 <div className="row">
//                     <div className="col-md-3" style={{ padding: '0px' }} >
//                         <Menu />
//                     </div>
//                     <div className="col-md-9" style={{ padding: '0px' }}>
//                         <AuthMenu />
//                         <div style={{ display: 'flex', height: '70vh', backgroundColor: 'blue' }}>                                                     

//                         </div>
//                         <div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default HomePage;










































































// import React, { useState , useEffect } from 'react';
// import Menu from '../Layout/Menu';
// import AuthMenu from '../Layout/AuthMenu';
// import axios from 'axios';
// import { useAuth } from '../Context/AuthProvider';
// import { Backend_url } from '../utils/Config';
// import { Link } from 'react-router-dom';

// const HomePage = () => {

//     const [myMusic,setMyMusic] = useState([])
//     const [auth, setAuth] = useAuth()

//     const [oneSong , setOneSong] = useState({})


//     const getMyMusic = async () => {
//         try 
//         {
//             const res = await axios.get(`${Backend_url}/api/song/get-allsongs`);
//             if (res.data.success === false) 
//             {                 
//                 alert(res.data.message)
//                 navigate('/')
//                 return

//             } 
//             else {
//             setMyMusic(res.data.songs);    



//             }

//         } 
//         catch (error) 
//         {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         if (auth.token) {
//             getMyMusic();
//             console.log(myMusic);

//         }

//     }, [auth.token]);


//     return (
//         <div className='home' style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
//             <div style={{ height: '90%', overflowY: 'auto', backgroundColor: 'black', color: 'white' }}>
//                 <div className="container-fluid">
//                     <div className="row">
//                         <div className="col-md-3 p-0" style={{ maxWidth: '25%' }} >
//                             <Menu />
//                         </div>
//                         <div className="col-md-9 p-0" style={{ height: '100%', maxWidth: '74.8%' }}>
//                             <AuthMenu />


//                             <div style={{ padding: '10px', height: '100%', backgroundColor: 'inherit' }}>
//                                 <div className="row">
//                                     {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((cardId) => (
//                                         <div key={cardId} className="col-md-4" style={{ marginBottom: '10px',padding :'0px 5px'  }}>
//                                             <div className="card" style={{ width: '100%'}}>
//                                                 <div className="card-body">
//                                                     <h5 className="card-title">Card {cardId}</h5>
//                                                     <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//                                                     <a href="#" className="btn btn-primary">Go somewhere</a>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div style={{ height: '10%', backgroundColor: 'black' }}>
// <div className='container'>
//             {myMusic.map((item, index) => (
//                     <div className="row " style={{ alignItems: 'center', padding: '10px', borderRadius: '6px' }}>
//                         <div className="col-1">
//                             <img src={item.thumbNail} style={{ height: '40px', width: '40px' }} alt="Thumbnail"></img>
//                         </div>
//                         <div className="col-2">
//                             <div className="row">
//                                 <p style={{fontSize: '12px',fontWeight:'bold', paddingTop: '0px', margin: '0px', color: 'white' }}>{item.name.substring(0, 20)}</p>
//                             </div>
//                             <div className="row">
//                                 <p style={{fontSize: '10px', paddingTop: '0px', margin: '0px', color: 'whitesmoke' }}>{item.artist.userName}</p>
//                             </div>
//                         </div>
//                         <div className="col-2">
//                             <div className="row">
//                                 <p style={{fontSize: '12px',fontWeight:'bold', paddingTop: '0px', margin: '0px', color: 'white' }}>{item.name.substring(0, 20)}</p>
//                             </div>
//                             <div className="row">
//                                 <p style={{fontSize: '10px', paddingTop: '0px', margin: '0px', color: 'whitesmoke' }}>{item.artist.userName}</p>
//                             </div>
//                         </div>
//                         <div className="col-2">
//                             <div className="row">
//                                 <p style={{fontSize: '12px',fontWeight:'bold', paddingTop: '0px', margin: '0px', color: 'white' }}>{item.name.substring(0, 20)}</p>
//                             </div>
//                             <div className="row">
//                                 <p style={{fontSize: '10px', paddingTop: '0px', margin: '0px', color: 'whitesmoke' }}>{item.artist.userName}</p>
//                             </div>
//                         </div>
//                         <div className="col-2">
//                             <div className="row">
//                                 <p style={{fontSize: '12px',fontWeight:'bold', paddingTop: '0px', margin: '0px', color: 'white' }}>{item.name.substring(0, 20)}</p>
//                             </div>
//                             <div className="row">
//                                 <p style={{fontSize: '10px', paddingTop: '0px', margin: '0px', color: 'whitesmoke' }}>{item.artist.userName}</p>
//                             </div>
//                         </div>
//                         <div className="col-2">
//                             <div className="row">
//                                 <p style={{fontSize: '12px',fontWeight:'bold', paddingTop: '0px', margin: '0px', color: 'white' }}>{item.name.substring(0, 20)}</p>
//                             </div>
//                             <div className="row">
//                                 <p style={{fontSize: '10px', paddingTop: '0px', margin: '0px', color: 'whitesmoke' }}>{item.artist.userName}</p>
//                             </div>
//                         </div>


//                     </div>
//             ))}
//         </div>
// </div>
//         </div>
//     );
// };

// export default HomePage;


// import React, { useState, useEffect } from 'react';
// import Menu from '../Layout/Menu';
// import AuthMenu from '../Layout/AuthMenu';
// import axios from 'axios';
// import { useAuth } from '../Context/AuthProvider';
// import { Backend_url } from '../utils/Config';
// import { Link } from 'react-router-dom';
// import { Howl, Howler } from 'howler';
// import { LuShuffle } from "react-icons/lu";
// import { MdOutlineSkipPrevious } from "react-icons/md";
// import { MdOutlineSkipNext } from "react-icons/md";
// import { FaPlay } from "react-icons/fa";
// import { IoMdRepeat } from "react-icons/io";
// import { FaPause } from "react-icons/fa";



// const HomePage = () => {

//     const [myMusic, setMyMusic] = useState([])

//     const [auth, setAuth] = useAuth()

//     const [currentSound, setCurrentSound] = useState(null)

//     const [isPaused, setIspaused] = useState(true)



//     const getMyMusic = async () => {
//         try {
//             const res = await axios.get(`${Backend_url}/api/song/get-allsongs`);
//             if (res.data.success === false) {
//                 alert(res.data.message)
//                 navigate('/')
//                 return

//             }
//             else {
//                 setMyMusic(res.data.songs);



//             }

//         }
//         catch (error) {
//             console.log(error);
//         }
//     };

//     const pauseMusic = () =>{
//         currentSound.pause()
//     }

//     const togglePlayPause = (track) =>{
//         if (isPaused) 
//         {
//             playMusic(track)            
//             setIspaused(false)

//         }
//         else
//         {
//             pauseMusic()
//             setIspaused(true)


//         }
//     }


//     const playMusic = (songSrc) => {
//         if (currentSound) {
//             currentSound.stop()
//         }

//         let sound = new Howl({
//             src: [songSrc],
//             html5: true
//         });

//         setCurrentSound(sound)
//         sound.play();


//     }


//     useEffect(() => {
//         if (auth.token) {
//             getMyMusic();
//             console.log(myMusic);

//         }

//     }, [auth.token]);

//     return (
//         <div className='home' style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
//             <div style={{ height: '90%', overflowY: 'auto', backgroundColor: 'black', color: 'white' }}>
//                 <div className="container-fluid">
//                     <div className="row">
//                         <div className="col-md-3 p-0">
//                             <Menu />
//                         </div>
//                         <div className="col-md-9 p-0 authmenu" style={{ height: '100%' }}>
//                             <AuthMenu />
//                             <div style={{ maxWidth: '98%', padding: '10px', backgroundColor: 'inherit' }}>
//                                 <div className="row">
//                                     {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((cardId) => (
//                                         <div key={cardId} className="col-lg-4 col-md-6 col-sm-12 mb-3">
//                                             <div className="card" style={{ width: '100%' }}>
//                                                 <div className="card-body">
//                                                     <h5 className="card-title">Card {cardId}</h5>
//                                                     <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//                                                     <a href="#" className="btn btn-primary">Go somewhere</a>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div style={{ height: '10%', backgroundColor: 'black' }}>
//                 <div className='container'>
//                     {myMusic.map((item, index) => (
//                         <div style={{ justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderRadius: '6px' }}>
//                             <div className="row">
//                                 <div className='col-2'>
//                                     <img src={item.thumbNail} style={{ height: '40px', width: '40px' }} alt="Thumbnail"></img>
//                                 </div>

//                                 <div className='col-2' >
//                                     <div className="row">
//                                         <p style={{ fontSize: '10px', fontWeight: 'bold', paddingTop: '0px', margin: '0px', color: 'white' }}>{item.name.substring(0, 10)}</p>
//                                     </div>
//                                     <div className="row" style={{alignItems: 'center'}}>
//                                         <p style={{ fontSize: '10px', paddingTop: '0px', margin: '0px', color: 'whitesmoke' }}>{item.artist.userName}</p>
//                                     </div>
//                                 </div>

//                                 <div className='col-5'>
//                                     <div  style={{ display: 'flex', justifyContent: 'space-between',marginBottom:'2px' }} >
//                                         <div className='playicons'>
//                                             <LuShuffle />
//                                         </div>

//                                         <div className='playicons'>
//                                             <MdOutlineSkipPrevious />
//                                         </div>


//                                         <div className='playicons'>
//                                             {isPaused ? 
//                                             <FaPlay onClick={() => {togglePlayPause(item.track)}}/>
//                                             :
//                                             <FaPause onClick={() => {togglePlayPause(item.track)}}/>

//                                             }
//                                         </div>

//                                         <div className='playicons'>
//                                             <MdOutlineSkipNext />
//                                         </div>

//                                         <div className='playicons'>
//                                             <IoMdRepeat />
//                                         </div>

//                                     </div>
//                                     <div className="row" style={{ backgroundColor: "red" }}>
//                                         w
//                                     </div>

//                                 </div>

//                             </div>


//                         </div>
//                     ))}
//                 </div>
//             </div>

//         </div>
//     );
// };

// export default HomePage;







import React, { useEffect, useState } from 'react';
import MainLayout from '../Layout/MainLayout';
import axios from 'axios';
import { Backend_url } from '../utils/Config';
import { Link, useNavigate } from 'react-router-dom';
import { useCurrentSong } from '../Context/SongContext';
import { usePlayList } from '../Context/PlaylistContextProvider';

const HomePage = () => {

    const [Songs, setSongs] = useState([])
    const [Playlists, setplaylists] = useState([])

    const { setCurrentSong, setAllSongs } = useCurrentSong()
    const { setPlayListId } = usePlayList()


    const navigate = useNavigate()

    const getAllSongs = async () => {
        try {
            const res = await axios.get(`${Backend_url}/api/song/get-songs`)
            setSongs(res.data.songs)

        }
        catch (error) {
            console.log(error);
        }
    }

    const getEverySongs = async () => {
        try {
            const res = await axios.get(`${Backend_url}/api/song/get-allsongs`)
            setAllSongs(res.data.songs)

        }
        catch (error) {
            console.log(error);
        }
    }

    const getPlaylist = async () => {
        try {
            const res = await axios.get(`${Backend_url}/api/playlist/getcretainplaylist`)
            setplaylists(res.data.playList)
        }

        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllSongs()
        getPlaylist()
        getEverySongs()
    }, [])
    return (
        <MainLayout>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '15px' }}>
                    Songs
                </div>
                <div >
                    <Link to='/allsongs' className="link-hover" style={{ fontWeight: 'bold', textDecoration: 'none', color: 'grey' }} >
                        show all
                    </Link>
                </div>

            </div>
            <div className="row">
                <div className='d-flex flex-wrap ' style={{ justifyContent: 'space-evenly', width: '100%' }}>
                    {Songs?.map((song, index) => (
                        <div onClick={() => setCurrentSong(song)} key={index} className="card m-2 col-xl-1 songcard" style={{ backgroundColor: 'black', borderRadius: '20px', border: 'none', width: '10rem' }}>

                            <div className="card-inner">
                                <img src={song.thumbNail}
                                    className="card-img "
                                    alt={song.name}
                                    height={'200px'} width={'60px'}
                                    style={{ borderRadius: '20px' }} />
                            </div>
                            <div className="card-body" style={{ backgroundColor: 'black', color: 'grey' }} >


                                {(song?.name || '').length > 14 ?
                                    <p className="card-text" style={{ color: 'white', fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}> {(song?.name || '').substring(0, 14)}...</p>
                                    :
                                    <p className="card-text" style={{ color: 'white', fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}> {(song?.name || '').substring(0, 14)}</p>
                                }

                                {(song?.artist?.firstName || '').length > 14 ?
                                    <p className="card-text" style={{ fontSize: '11px', fontWeight: 'bold' }}>{(song?.artist?.firstName || '').substring(0, 14)}</p>
                                    :
                                    <p className="card-text" style={{ fontSize: '11px', fontWeight: 'bold' }}>{(song?.artist?.firstName || '').substring(0, 14)}</p>
                                }
                            </div>

                        </div>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '15px' }}>
                    Playlists
                </div>
                <div >
                    <Link to='/allplaylists' className="link-hover" style={{ fontWeight: 'bold', textDecoration: 'none', color: 'grey' }} >
                        show all
                    </Link>
                </div>

            </div>


            <div className="row">
                <div className='d-flex flex-wrap ' style={{ justifyContent: 'space-evenly', width: '100%' }}>
                    {Playlists?.map((playList, index) => (
                        <div key={index} onClick={(e) => {
                            localStorage.setItem('currentPlaylist', JSON.stringify(playList._id));

                            setPlayListId(playList._id)

                            navigate('/playlist-songs')

                        }} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="card m-2 col-lg-2 songcard" style={{ backgroundColor: 'white', borderRadius: '20px', width: '10rem' }}>
                                <div className="card-inner" style={{ height: '10rem' }}>
                                    <img src={playList.thumbNail} className="card-img" alt={playList.name} width={'60px'} style={{ borderRadius: '20px' }} />
                                </div>
                                <div className="card-body" style={{ backgroundColor: 'black', color: 'grey', textAlign: 'center' }}>
                                    {(playList?.name || '').length > 10 ?
                                        <p className="card-text" style={{ color: 'white', fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}> {(playList?.name || '').substring(0, 10)}...</p>
                                        :
                                        <p className="card-text" style={{ color: 'white', fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}> {(playList?.name || '').substring(0, 10)}</p>
                                    }
                                    <div>



                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>














        </MainLayout>
    );
};

export default HomePage;


