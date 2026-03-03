import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Backend_url } from '../../utils/Config';
import { Link, useNavigate } from 'react-router-dom';
import { useCurrentSong } from '../../Context/SongContext';
import MainLayout from '../../Layout/MainLayout';
import { CiSquarePlus } from "react-icons/ci";
import { useAuth } from '../../Context/AuthProvider';

const CreatePlaylist = () => {
    const [playListname, setPlayListname] = useState('');
    const [playListId, setPlayListId] = useState();

    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const { setCurrentSong } = useCurrentSong();
    const [thumbNail , setThumbNail] = useState("")

    const [auth,setAuth] = useAuth()

    const navigate = useNavigate()


    const handleThumbnail =(e)=>{
        setThumbNail(e.target.value)
    }

    const handleOnChangePlaylistName = (e) => {
        const value = e.target.value
        setPlayListname(value)
    }



    const createPlaylist = async (id) => {
        try {

            if (playListname.length === 0) {
                return alert("please Enter PlayList Name")
            }

            



            if (!playListId) {


                const { data } = await axios.post(`${Backend_url}/api/playlist/create-playlist`,
                    {
                        songs: id,
                        name: playListname,
                        thumbNail :thumbNail

                    }

                )

                const playlistnamehtml = document.getElementById("playlistname")
                playlistnamehtml.disabled = true

                setPlayListId(data.newPlaylist._id)
            }

            else {
                const { data } = await axios.post(`${Backend_url}/api/playlist/addsong`,
                    {
                        songId: id,
                        playlistId: playListId
                    }

                )
            }
        }

        catch (error) {
            console.log(error);
        }

    }


    
    const handleOnChange = async (e) => {
        const value = e.target.value;
        setSearchText(value);

        searchSongs(value);
    };

    const searchSongs = async (text) => {
        try {
            const { data } = await axios.post(`${Backend_url}/api/song/search-only-songs`, { searchText: text });
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


    useEffect(() => {
        if (!auth.token) 
           {
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
           

            <div style={{ marginBottom: "30px" }}>
                <p style={{ fontWeight: 'bold', alignContent: 'center', margin: '20px 0px 5px' }} >Playlist name</p>
                <input style={{ borderRadius: "20px", padding: "15px 10px", margin: '5px 5px ' }}
                    id='playlistname'
                    size="40" type='text' onChange={handleOnChangePlaylistName} value={playListname}></input>


            </div>

 <div style={{ marginBottom: "30px" }}>
               
 <p style={{ fontWeight: 'bold', alignContent: 'center', margin: '20px 0px 5px' }}>Add picture</p>
                    
                    <input style={{ borderRadius: "20px", padding: "15px 10px", margin: '5px 5px ' }}
                    id='thumbnail'
                    onChange={handleThumbnail}
                    value={thumbNail}
                    size="40" type='text' ></input>
            </div>


            <div style={{ marginBottom: "20px" }}>
                <h4>Let's find something for your playlist</h4>
            </div>

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
                                        <button id = {`addButton${item._id}`}
                                            onClick={() => {


                                                createPlaylist(item._id)
                                                const addButton = document.getElementById(`addButton${item._id}`)
                                                addButton.innerHTML='Added'

                                                setTimeout(()=>{
                                                    addButton.innerHTML = 'Add'
                                                },1000)
                                                
                                            }}

                                            style={{ borderColor: "white", borderRadius: "20px", padding: "6px 12px", fontSize: '14px', color: 'white',fontWeight: 'bold', backgroundColor: 'black' }}
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
        </MainLayout>
    );
};

export default CreatePlaylist;