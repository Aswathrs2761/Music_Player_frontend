import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MainLayout from '../../Layout/MainLayout';
import { useCurrentSong } from '../../Context/SongContext';
import { usePlayList } from '../../Context/PlaylistContextProvider';
import { Backend_url } from '../../utils/Config';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { useAuth } from '../../Context/AuthProvider';


const PlayListSongs = () => {

    const { setCurrentSong, currentSong, setAllSongs, allSongs } = useCurrentSong()

    const [songs, setSongs] = useState([])
    const [playListdetails, setPlayListDetails] = useState({})
    const [likedSongsId, setLikedSongsId] = useState([])
    const [likedPlaylistArray, setLikedPlaylistArray] = useState([])



    const { playListId, setPlayListId } = usePlayList()
    const [auth, setAuth] = useAuth()




    const getplaylistSongs = async () => {

        const { data } = await axios.get(`${Backend_url}/api/playlist/getplaylistbyid/${playListId}`)

        setSongs(data.playList.songs);
        setAllSongs(data.playList.songs);
        setPlayListDetails(data.playList);

    }


    useEffect(() => {

        if (!playListId) {
            setPlayListId(JSON.parse(localStorage.getItem('currentPlaylist')))
        }
        else {
            getplaylistSongs()
        }

    }, [playListId])

    // liked songs start 

    // getting liked songs of user

    const getLikedSongs = async () => {
        try {
            const { data } = await axios.get(`${Backend_url}/api/user/getlikedsongs`);

            const likedSongArray = data.userLikedSongs.likedSongs

            if (likedSongArray.length > 0) {
                var likedSongIds = likedSongArray.map(function (song) {
                    return song._id;
                });
                setLikedSongsId(data => likedSongIds)
            }

        }
        catch (error) {
            console.log(error);
        }
    };

    // adding and removing liked song of user    

    const addOrRemoveLikes = async (newlikedarray) => {
        try {
            await axios.post(`${Backend_url}/api/user/addorremovelikes`, { newlikedarray })

        }
        catch (error) {
            console.log(error);
        }
    }

    // useEffect to call getLikedSongs() 
    // if auth is avalable else it will check local storage to check whether token is present or not

    useEffect(() => {
        if (auth.token) {
            getLikedSongs()
            getLikedPlayList()
        }
        else {

            const data = localStorage.getItem('auth')

            if (data) {
                const parseData = JSON.parse(data)
                setAuth({
                    ...auth,
                    user: parseData.user,
                    token: parseData.token
                })

            }

            else {
                if (confirm('Login to Continue')) {
                    navigate('/login');
                } else {
                    navigate('/');
                }

            }
        }

    }, [auth])





    const handleHeartClick = (e, songId) => {

        e.preventDefault();
        const index = likedSongsId.indexOf(songId);
        e.stopPropagation();

        if (index === -1) {
            setLikedSongsId(prevLikedSongs => {
                const newLikedSongs = [...prevLikedSongs, songId];
                addOrRemoveLikes(newLikedSongs)
                return newLikedSongs;
            });
        }

        else {
            const updatedLikedSongs = likedSongsId.filter((song, i) => i !== index);
            setLikedSongsId(updatedLikedSongs); // Update likedSongs state
            addOrRemoveLikes(updatedLikedSongs);
        }

    };

    const handleCardClick = (song) => {

        setCurrentSong(song);

    };

    // like song end   


    const getLikedPlayList = async () => {

        try {
            const { data } = await axios.get(`${Backend_url}/api/user/getlikedplaylist`);

            setLikedPlaylistArray(data.LikedPlaylistId.likedPlaylists)

        }

        catch (error) {
            console.log(error);
        }
    }

    const addLikedPlaylist = async (playlistId) => {
        try {
            await axios.post(`${Backend_url}/api/user/addlikedplaylist`, { playlistId })
            getLikedPlayList()

        }
        catch (error) {
            console.log(error);
        }
    }

    const removeLikedPlaylist = async (playlistId) => {
        try {
            await axios.post(`${Backend_url}/api/user/removelikedplaylist`, { playlistId })
            getLikedPlayList()

        }
        catch (error) {
            console.log(error);
        }
    }




    return (

        <MainLayout>
            <div className='row' style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems:'baseline',
                marginBottom: '20px'
            }}>
                <div className="col-7" style={{ fontSize: '30px' }}>{playListdetails.name}</div>

                <div className="col-2">
                    <div className="row" style={{ fontSize: '25px' }}>
                        <FaHeart className='like'

                            onClick={() => {


                                if (!likedPlaylistArray.includes(playListdetails._id)) {

                                    addLikedPlaylist(playListdetails._id)
                                   
                                }
                                else {
                                    removeLikedPlaylist(playListdetails._id)

                                }

                            }}

                            style={{ color: likedPlaylistArray.includes(playListdetails._id) ? 'red' : 'white' }}

                        />
                    </div>
                    <div className="row" >
                        <p style={{textAlign:'center'}}>{likedPlaylistArray.includes(playListdetails._id) ? 'Liked!' : 'Like'}</p>
                    </div>

                </div>

            </div>

            <div>
                {songs &&

                    songs.length > 0 &&
                    <>
                    <div style={{marginBottom:'30px',fontSize:'20px',fontWeight:'bold'}}>
                        SONGS
                    </div>
                        {songs.map((item, index) => (

                            <Link key={index} onClick={(e) => {

                                handleCardClick(item);
                            }}


                                style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="row songrow" style={{ alignItems: 'center', padding: '10px', borderRadius: '6px' }}>
                                    <div className="col-2">
                                        <img src={item.thumbNail} style={{ height: '40px', width: '40px' }} alt="Thumbnail"></img>
                                    </div>
                                    <div className="col-6">
                                        {(item?.name || '').length > 15 ?
                                            <p style={{ paddingTop: '0px', margin: '0px', color: 'white' }}> {(item?.name || '').substring(0, 15)}...</p>
                                            :
                                            <p style={{ paddingTop: '0px', margin: '0px', color: 'white' }}> {(item?.name || '').substring(0, 15)}</p>
                                        }

                                        {(item?.artist?.userName || '').length > 15 ?
                                            <p style={{ paddingTop: '0px', margin: '0px', color: 'white' }}> {(item?.artist?.userName || '').substring(0, 15)}...</p>
                                            :
                                            <p style={{ paddingTop: '0px', margin: '0px', color: 'white' }}> {(item?.artist?.userName || '').substring(0, 15)}</p>
                                        }


                                    </div>

                                    <div className='col-2'>
                                        {item.duration}
                                    </div>

                                    <div className='col-2' style={{ paddingLeft: '30px' }}>
                                        <FaHeart className='like'

                                            onClick={(e) => {
                                                handleHeartClick(e, item._id)

                                            }}

                                            style={{ color: likedSongsId.includes(item._id) ? 'red' : 'white' }}
                                        />
                                    </div>

                                </div>
                            </Link>
                        ))}

                    </>


                }
            </div>


        </MainLayout>


    );
};

export default PlayListSongs;