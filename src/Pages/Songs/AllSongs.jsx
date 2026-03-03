import React, { useEffect, useState } from 'react';
import MainLayout from '../../Layout/MainLayout';
import axios from 'axios';
import { Backend_url } from '../../utils/Config';
import { Link, useNavigate } from 'react-router-dom';
import { useCurrentSong } from '../../Context/SongContext';
import { FaHeart } from 'react-icons/fa';
import { useAuth } from '../../Context/AuthProvider';

const AllSongs = () => {

    const [songs, setSongs] = useState([])

    const { setCurrentSong, setAllSongs } = useCurrentSong()


    const [likedSongsId, setLikedSongsId] = useState([])

    const [auth, setAuth] = useAuth()

    const navigate = useNavigate()



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


    // get all songs from database to display

    const getAllSongs = async () => {
        try {
            const res = await axios.get(`${Backend_url}/api/song/get-allsongs`)
            setSongs(res.data.songs)

            setAllSongs(res.data.songs)

        }
        catch (error) {
            console.log(error);
        }
    }



    const handleHeartClick = (e, songId) => {


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


    // use effect to call getAllSongs function

    useEffect(() => {
        getAllSongs()
    }, [])

    return (
        <MainLayout>
            <div style={{fontSize: '22px',fontWeight: 'bold', marginBottom: '20px' }}>
                All Songs
            </div>
            <div className="row">
                <div className='d-flex flex-wrap ' style={{ justifyContent: 'space-evenly', width: '100%' }}>
                    {songs?.map((song, index) => (
                        <div
                            onClick={() => {
                                handleCardClick(song)
                            }
                            }

                            key={index} className="card m-2 col-xl-1 songcard" style={{ backgroundColor: 'black', borderRadius: '20px', border: 'none', width: '10rem' }}>

                            <div className="card-inner">
                                <img src={song.thumbNail}
                                    className="card-img "
                                    alt={song.name}
                                    height={'200px'} width={'60px'}
                                    style={{ borderRadius: '20px' }} />
                            </div>
                            <div className="card-body" style={{ backgroundColor: 'black', color: 'grey', padding: '5px' }} >

                                <div className='row' >
                                    <div className='col-8'>
                                        {(song?.name || '').length > 7 ?
                                            <p className="card-text" style={{ color: 'white', fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}> {(song?.name || '').substring(0, 7)}...</p>
                                            :
                                            <p className="card-text" style={{ color: 'white', fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}> {(song?.name || '').substring(0, 7)}</p>
                                        }

                                        {(song?.artist?.firstName || '').length > 11 ?
                                            <p className="card-text" style={{ fontSize: '11px', fontWeight: 'bold' }}>{(song?.artist?.firstName || '').substring(0, 11)}...</p>
                                            :
                                            <p className="card-text" style={{ fontSize: '11px', fontWeight: 'bold' }}>{(song?.artist?.firstName || '').substring(0, 11)}</p>
                                        }
                                    </div>

                                    <div className='col-3'>
                                        <FaHeart className='like'

                                            onClick={(e) => {
                                                handleHeartClick(e, song._id)

                                            }}

                                            style={{ color: likedSongsId.includes(song._id) ? 'red' : 'white' }}
                                        />

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

export default AllSongs;