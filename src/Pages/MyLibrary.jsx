import React, { useEffect, useState } from 'react';
import MainLayout from '../Layout/MainLayout';
import { useAuth } from '../Context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Backend_url } from '../utils/Config';
import { FaHeart } from "react-icons/fa";
import { usePlayList } from '../Context/PlaylistContextProvider';

const MyLibrary = () => {

    const [likedSongs, setLikedSongs] = useState([])
    const [likedPlaylistArray, setLikedPlaylistArray] = useState([])

    const navigate = useNavigate();

    const [auth, setAuth] = useAuth()
    const { setPlayListId } = usePlayList()




    const getLikedSongs = async () => {
        try {
            const { data } = await axios.get(`${Backend_url}/api/user/getlikedsongs`);
            setLikedSongs(data.userLikedSongs.likedSongs);
            console.log(data.userLikedSongs.likedSongs);

        } catch (error) {
            console.log(error);
        }
    }

    const getLikedPlayList = async () => {

        try {
            const { data } = await axios.get(`${Backend_url}/api/user/getlikedplaylistwithdetails`);

            setLikedPlaylistArray(data.LikedPlaylistId.likedPlaylists)

        }

        catch (error) {
            console.log(error);
        }
    }

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

    return (
        <MainLayout>
            <Link to='/likedsongs' style={{ textDecoration: 'none' }}>
                <div className='row  likedsongrow' style={{ padding: '10px 0px', alignItems: 'center' }}>

                    <div className='col-3'>
                        <FaHeart style={{ borderRadius: '5px', fontSize: '50px', color: "white", background: 'linear-gradient(to right, #055378, #B1CDDA)',marginLeft:'10px', padding: '15px' }} />
                    </div>

                    <div className='col' style={{ color: 'white', fontWeight: 'bold' }}>
                        LIKED SONGS : {likedSongs.length}
                    </div>

                </div>

            </Link>

            <div>
                {likedPlaylistArray.length > 0 ? 
                <div>

                    <p style={{marginTop : '20px',fontSize:'20px',fontWeight:'bold'}}>Liked Playlists</p>

<div >
                        {likedPlaylistArray.map((item, index) => (

                            <div key={index}  onClick={(e) => { 
                                localStorage.setItem('currentPlaylist', JSON.stringify(item._id));

                                    setPlayListId(item._id)

                                    navigate('/playlist-songs')
                                }}

                                
                                style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="row songrow" style={{ alignItems: 'center', padding: '10px', borderRadius: '6px' }}>
                                    <div className="col-3">
                                        <img src={item.thumbNail} style={{ height: '50px', width: '50px',borderRadius:'5px' }} alt="Thumbnail"></img>
                                    </div>
                                    <div className="col">
                                    {(item?.name || '').length > 10 ? 
                                        <p style={{paddingTop: '0px', margin: '0px', color: 'white' , fontWeight: 'bold',fontSize: '20px' }}> {(item?.name || '').substring(0,10)}...</p> 
                                        :
                                        <p  style={{paddingTop: '0px', margin: '0px', color: 'white', fontWeight: 'bold',fontSize: '20px' }}> {(item?.name || '').substring(0,10)}</p> 
                                        } 

                                    
                                
                                        
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                :
                <div>
                    <p style={{marginTop : '20px',fontSize:'20px',fontWeight:'bold'}}>No liked PlayList</p>
                </div>
                }
            </div>


        </MainLayout>
    );
};

export default MyLibrary;