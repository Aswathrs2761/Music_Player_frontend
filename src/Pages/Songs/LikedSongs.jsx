import React, { useEffect, useState } from 'react';
import MainLayout from '../../Layout/MainLayout';
import { useAuth } from '../../Context/AuthProvider';
import axios from 'axios';
import { Backend_url } from '../../utils/Config';
import { FaHeart } from 'react-icons/fa';
import { useCurrentSong } from '../../Context/SongContext';


const LikedSongs = () => {

    const [likedSongs, setLikedSongs] = useState([])
    const [likedSongsId, setLikedSongsId] = useState([])
    const [auth, setAuth] = useAuth()
    const { currentSong, setCurrentSong, allSongs, setAllSongs } = useCurrentSong()


    const getLikedSongs = async () => {
        try {
            const { data } = await axios.get(`${Backend_url}/api/user/getlikedsongs`);

            setLikedSongs(data.userLikedSongs.likedSongs)

            const likedSongArray = data.userLikedSongs.likedSongs

            if (likedSongArray.length > 0) {
                var likedSongIds = likedSongArray.map(function (song) {
                    return song._id;
                });
                setLikedSongsId(data => likedSongIds)

                settingLikedSongs(likedSongArray)
            }

        }
        catch (error) {
            console.log(error);
        }
    };

    const settingLikedSongs = (subArray) => {

        const filteredMainArray = allSongs.filter(song => !subArray.some(subSong => subSong._id === song._id));

        console.log(filteredMainArray);

        const updatedAllSongs = subArray.concat(filteredMainArray);

        setAllSongs(updatedAllSongs);

    }


    const handleHeartClick = (e, songId) => {

        const index = likedSongsId.indexOf(songId);
        e.stopPropagation();


        const updatedLikedSongs = likedSongsId.filter((song, i) => i !== index);
        setLikedSongsId(updatedLikedSongs); // Update likedSongs state
        addOrRemoveLikes(updatedLikedSongs);

    };

    const handleCardClick = (song) => {

        setCurrentSong(song);

    };

    const addOrRemoveLikes = async (newlikedarray) => {
        try {
            await axios.post(`${Backend_url}/api/user/addorremovelikes`, { newlikedarray })
            getLikedSongs()

        }
        catch (error) {
            console.log(error);
        }
    }


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




    return (
        <MainLayout>
            <div >
                <h3 style={{ color: 'white', marginLeft: '20px' }}>My Songs</h3>
            </div>
            <div className='container'>



                {likedSongs.map((item, index) => (

                    <div key={index}

                        onClick={() => {

                            handleCardClick(item);

                        }}




                        style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="row songrow" style={{ alignItems: 'center', padding: '10px', borderRadius: '6px' }}>

                            <div className="col-2">
                                <img src={item.thumbNail} style={{ height: '40px', width: '40px' }} alt="Thumbnail"></img>
                            </div>
                            <div className="col-7">
                                {(item?.name || '').length > 10 ?
                                    <p style={{ paddingTop: '0px', margin: '0px', color: 'white' }}> {(item?.name || '').substring(0, 10)}...</p>
                                    :
                                    <p style={{ paddingTop: '0px', margin: '0px', color: 'white' }}> {(item?.name || '').substring(0, 10)}</p>
                                }

                                {(item?.artist?.userName || '').length > 12 ?
                                    <p style={{ paddingTop: '0px', margin: '0px', color: 'white' }}> {(item?.artist?.userName || '').substring(0, 11)}...</p>
                                    :
                                    <p style={{ paddingTop: '0px', margin: '0px', color: 'white' }}> {(item?.artist?.userName || '').substring(0, 11)}</p>
                                }


                            </div>

                            <div className='col-2'>
                                {item.duration}
                            </div>

                            <div className='col-1'>
                                <FaHeart className='like'

                                    onClick={(e) => {
                                        handleHeartClick(e, item._id)

                                    }}

                                    style={{ color: likedSongsId.includes(item._id) ? 'red' : 'white' }}

                                />
                            </div>

                        </div>
                    </div>
                ))}
            </div>



        </MainLayout>
    );
};

export default LikedSongs;


