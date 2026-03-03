import React, { useEffect, useState } from 'react';
import MainLayout from '../Layout/MainLayout';
import axios from 'axios';
import { Backend_url } from '../utils/Config';
import { Link, useNavigate } from 'react-router-dom';
import { useCurrentSong } from '../Context/SongContext';
import PlayListSongs from './PlayList/PlayListSongs';
import { usePlayList } from '../Context/PlaylistContextProvider';
import { FaHeart } from 'react-icons/fa';
import { useAuth } from '../Context/AuthProvider';



const Search = () => {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [likedSongsId, setLikedSongsId] = useState([])


    const { setCurrentSong } = useCurrentSong();
    const { setPlayListId } = usePlayList()
    const [auth, setAuth] = useAuth()




    const [likedSongs, setLikedSongs] = useState([])

    const navigate = useNavigate()


    // getting text ,from search bar
    const handleOnChange = async (e) => {
        const value = e.target.value;
        setSearchText(value);

        searchSongs(value);
    };


    //search songs with given text

    const searchSongs = async (text) => {
        try {
            const { data } = await axios.post(`${Backend_url}/api/song/search-songs`, { searchText: text });
            console.log(data.result);
            if (data.success) {
                setSearchResults(data.result);
            } else {
                setSearchResults([]);
            }
        } catch (error) {
            console.error('Error searching songs:', error);
            setSearchResults([]);
        }
    };

    // add or remove liked songs

    const addOrRemoveLikes = async (newlikedarray) => {
        try {
            await axios.post(`${Backend_url}/api/user/addorremovelikes`, { newlikedarray })

        }
        catch (error) {
            console.log(error);
        }
    }

    //getting already liked songs so that we can mark it as liked

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
            }
        }
        catch (error) {
            console.log(error);
        }
    };



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
            <div>
                <input className='searchinput' size="40" type="text" placeholder="What do you want to listen?" value={searchText} onChange={handleOnChange} />
            </div>

            <div className='container'>
                {searchResults.length === 0 && searchText.trim() !== '' && (
                    <div style={{ textAlign: 'center', marginTop: '100px' }}>
                        <h3>No results found for "{searchText}"</h3>
                        <h5>Please make sure your words are spelled correctly, or use fewer or different keywords.</h5>
                    </div>
                )}

                {searchResults.length > 0 && (
                    <div>
                        {searchResults.map((item, index) => (
                            <div key={index} onClick={() => {

                                if (item.owner) {

                                    localStorage.setItem('currentPlaylist', JSON.stringify(item._id));

                                    setPlayListId(item._id)

                                    navigate('/playlist-songs')

                                }

                                else {
                                    handleCardClick(item)
                                }

                            }} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="row songrow" style={{ alignItems: 'center', padding: '10px', borderRadius: '6px' }}>
                                    <div className="col-2">
                                        <img src={item.thumbNail} style={{ height: '40px', width: '40px' }} alt="Thumbnail" />
                                    </div>

                                    <div className="col-8">
                                        <div className="row">
                                            {(item?.name || '').length > 15
                                                ?
                                                <p style={{ paddingTop: '0px', margin: '0px', color: 'white' }}>{(item?.name || '').substring(0, 15)}...</p>
                                                :
                                                <p style={{ paddingTop: '0px', margin: '0px', color: 'white' }}>{(item?.name || '').substring(0, 15)}</p>
                                            }
                                        </div>
                                    </div>

                                    {!item.owner &&
                                    <div className="col-2">

                                        <FaHeart className='like'

                                            onClick={(e) => {

                                                handleHeartClick(e, item._id)

                                            }}
                                            style={{ color: likedSongsId.includes(item._id) ? 'red' : 'white' }}
                                        />

                                    </div>
                                    }


                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default Search;