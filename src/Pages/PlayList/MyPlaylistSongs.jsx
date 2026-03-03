import React, { useEffect, useState } from 'react';
import MainLayout from '../../Layout/MainLayout';
import axios from 'axios';
import { Backend_url } from '../../utils/Config';
import { Link } from 'react-router-dom';
import { useCurrentSong } from '../../Context/SongContext';
import { IoMdClose } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";


const MyPlaylistSongs = () => {
    const [currentPlaylist, setCurrentPlaylist] = useState();
    const [playlistId, setPlaylistId] = useState(null);
    const [addMore, setAddMore] = useState(false)

    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const { setCurrentSong,setAllSongs } = useCurrentSong();

    const [newNameTextBox, setNewNameTextBox] = useState(false)
    const [newPlaylistName, setNewPlaylistName] = useState()


    const handleOnChange = async (e) => {
        const value = e.target.value;
        setSearchText(value);

        searchSongs(value);
    };

    const handleChangeNewPlaylistName = async (e) => {
        const value = e.target.value;
        setNewPlaylistName(value);
    };

    const changePlaylistName = async () => {
       try {
        await axios.put(`${Backend_url}/api/playlist/changename/${playlistId}`, {
            newName: newPlaylistName
        });
        getPlaylist()
        setNewNameTextBox(false)

       } catch (error) {
        console.log(error);
        
       }
    }



    const searchSongs = async (text) => {
        try {
            const { data } = await axios.post(`${Backend_url}/api/song/search-only-songs`, { searchText: text });
            if (data.success) {
                setSearchResults(data.result);
            }
            else {
                setSearchResults([]);
            }
        } catch (error) {
            console.error('Error searching songs:', error);
            setSearchResults([]);
        }
    };


    const addSong = async (id) => {
        try {

            await axios.post(`${Backend_url}/api/playlist/addsong`,
                {
                    songId: id,
                    playlistId: playlistId
                }

            )

            getPlaylist()
        }

        catch (error) {
            console.log(error);
        }

    }



    const deleteSong = async (id) => {
        var result = confirm("Do you want to remove this?");
        if (result) {
        try {            
            await axios.post(`${Backend_url}/api/playlist/deletesong`,
                {
                    songId: id,
                    playlistId: playlistId
                }

            )
            getPlaylist()
        }

        catch (error) {
            console.log(error);
        }
    }
    }





    const getPlaylist = async () => {
        try {
            const { data } = await axios.get(`${Backend_url}/api/playlist/getplaylistbyid/${playlistId}`);
            setCurrentPlaylist(data.playList);
            setAllSongs(data.playList.songs)

        } catch (error) {
            console.error('Error fetching playlist:', error);
        }
    };









    useEffect(() => {
        // Function to fetch playlist from the database
        const fetchPlaylist = async () => {
            try {
                const { data } = await axios.get(`${Backend_url}/api/playlist/getplaylistbyid/${playlistId}`);
                setCurrentPlaylist(data.playList);
            } catch (error) {
                console.error('Error fetching playlist:', error);
            }
        };

        const storedPlaylistId = JSON.parse(localStorage.getItem('currentPlaylist'))
        if (storedPlaylistId) {
            setPlaylistId(storedPlaylistId);
        }

        // Call fetchPlaylist when playlistId is set
        if (playlistId) {
            fetchPlaylist();
        }
    }, [playlistId]); // Run this effect whenever playlistId changes



    useEffect(() => {

    }, [currentPlaylist])

    return (
        <MainLayout>
            <div>
                {currentPlaylist &&
                    <div>
                        {!newNameTextBox ?

                            <div
                                style={{ display: 'flex', justifyContent: 'center', alignItems: "baseline", fontSize: "30px", fontWeight: 'bold' }}
                            >
                                {(currentPlaylist?.name || '').length > 14 ?
                                    <>
                                        <div>{(currentPlaylist?.name || '').substring(0, 10)}...</div>
                                    </>
                                    :
                                    <>
                                        <div>{currentPlaylist.name}</div>
                                    </>

                                }
                                <div style={{ fontSize: '30px' }}>
                                    <button
                                        onClick={() => setNewNameTextBox(true)}
                                        style={{ border: 'none', padding: '0px', backgroundColor: 'black', color: 'white' }}>
                                        <MdModeEdit />
                                    </button>
                                </div>
                            </div>
                            :
                            <div style={{ margin: '20px 5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                            >
                                <div>
                                    <input type='text' size="20"
                                        value={newPlaylistName}
                                        onChange={handleChangeNewPlaylistName}
                                        placeholder={currentPlaylist.name}

                                        style={{ padding: '20px 17px', borderRadius: '10px' }}
                                    ></input>
                                    <button
                                        style={{ borderColor: "white", borderRadius: "20px", padding: "6px 12px", fontSize: '14px', color: 'white', backgroundColor: 'black', marginLeft: '5px' }}
                                        onClick={changePlaylistName}

                                    >save</button>
                                </div>


                                <div
                                    style={{ borderColor: "white", borderRadius: "30px", padding: "0px 0px", fontSize: '15px', color: 'white', backgroundColor: 'black' }}
                                >
                                    <IoCloseSharp onClick={() => setNewNameTextBox(false)} />

                                </div>

                            </div>

                        }

                    </div>
                }


                {currentPlaylist &&

                    currentPlaylist.songs && currentPlaylist.songs.length > 0
                    ?
                    (
                        <div>
                            <p style={{ marginTop: '20px', fontWeight: 'bold' }}>Songs</p>
                            {currentPlaylist.songs.map((item, index) => (
                                <div>
                                    <Link key={index}
                                        onClick={(e) => {
                                            if (!e.target.classList.contains('delete-button')) {

                                                setCurrentSong(item)

                                            }
                                        }}
                                        style={{ textDecoration: 'none', color: 'inherit' }}>

                                        <div className="row songrow" style={{ alignItems: 'center', padding: '10px', borderRadius: '6px' }}>
                                            <div className="col-2">
                                                <img src={item.thumbNail} style={{ height: '40px', width: '40px' }} alt="Thumbnail"></img>
                                            </div>
                                            <div className="col-6">
                                                <div className="row">


                                                    {(item?.name || '').length > 10 ?
                                                        <p style={{ paddingTop: '0px', margin: '0px', color: 'white' }}> {(item?.name || '').substring(0, 10)}...</p>
                                                        :
                                                        <p style={{ paddingTop: '0px', margin: '0px', color: 'white' }}> {(item?.name || '').substring(0, 10)}</p>
                                                    }


                                                </div>

                                                {/* <div className="row">

                                        {item.name.length > 10 ? 
                                        <p style={{paddingTop: '0px', margin: '0px', color: 'white' }}> {item.artist.firstName.substring(0,11)}...</p> 
                                        :
                                        <p  style={{paddingTop: '0px', margin: '0px', color: 'white' }}> {item.artist.firstName.substring(0,11)}</p> 
                                        }  
                                        
                                        
                                        </div> */}

                                            </div>
                                            <div className='col-1'>
                                                {item.duration}
                                            </div>


                                            <div className='col-3'>
                                                <button className='delete-button' onClick={() => deleteSong(item._id)} style={{ borderColor: "white", borderRadius: "20px", padding: "6px 12px", fontSize: '14px', color: 'white',marginLeft: '10px', backgroundColor: 'black' }}>
                                                    delete
                                                </button>
                                            </div>

                                        </div>
                                    </Link>
                                </div>

                            ))}
                        </div>
                    ) : (
                        <p style={{ marginTop: '20px', fontWeight: 'bold' }}>No songs in this playlist.</p>
                    )}


                {addMore ?
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <input className='searchinput'
                                    size="30" type="text"
                                    placeholder="Search for songs"
                                    style={{ margin: '30px 0px 30px 0px' }}
                                    value={searchText}
                                    onChange={handleOnChange} />
                            </div>

                            <div style={{ fontSize: '30px', fontWeight: 'bold' }}>
                                <p><IoMdClose onClick={() => setAddMore(false)} /></p>
                            </div>


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

                                        <div className="row songrow" style={{ alignItems: 'center', padding: '10px', borderRadius: '6px' }}>
                                            <div className="col-2">
                                                <img src={item.thumbNail} style={{ height: '40px', width: '40px' }} alt="Thumbnail" />
                                            </div>
                                            <div className="col-8">
                                                <div className="row">
                                                    <p style={{ paddingTop: '0px', margin: '0px', color: 'white' }}>{item.name.substring(0, 20)}...</p>
                                                </div>
                                            </div>


                                            <div className="col-2">
                                                <div className="row">
                                                    <button
                                                        onClick={() => {


                                                            addSong(item._id)


                                                        }}

                                                        style={{ borderColor: "white", borderRadius: "20px", padding: "6px 12px", fontSize: '14px', color: 'white', backgroundColor: 'black' }}
                                                    >
                                                        Add
                                                    </button>
                                                </div>
                                            </div>



                                        </div>

                                    ))}
                                </div>
                            )}
                        </div>

                    </div>
                    :
                    <div style={{ margin: '30px 0px 30px 20px', fontSize: '30px' }}>
                        <span className='addmore' onClick={setAddMore(true)}>
                            Add Songs
                        </span>
                    </div>

                }
            </div>
        </MainLayout>
    );
};

export default MyPlaylistSongs;