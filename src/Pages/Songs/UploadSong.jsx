import React, { useEffect, useState } from 'react';
import Menu from '../../Layout/Menu';
import AuthMenu from '../../Layout/AuthMenu';
import CloudinaryUpload from '../../Components/CloudinaryUpload.jsx';
import { Backend_url } from '../../utils/Config.js';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../Context/AuthProvider.jsx';


const UploadSong = () => {

    const [name, setName] = useState("")
    const [thumbNail, setThumbNail] = useState("")
    const [trackUrl, setTrackUrl] = useState("")
    const [uploadedSongFileName, setUploadedSongFileName] = useState("")
    const navigate = useNavigate()
    const [auth, setAuth] = useAuth()


    const handleName = (e) => {
        setName(e.target.value)
    }


    const handleThumbnail = (e) => {
        setThumbNail(e.target.value)
    }

    const handleOnSubmit = async () => {

        const duration = await getDuration(trackUrl)

        const data = { name, thumbNail, track: trackUrl, duration }

        const res = await axios.post(`${Backend_url}/api/song/create-song`, data)

        if (res.data.success === false) {
            alert("couldn't able to create song")
            return
        }
        alert("song created")
        navigate('/')
    }

    const getDuration = async (url) => {
        try {
            const audioElement = document.createElement('audio');
            audioElement.src = url;
            audioElement.preload = 'metadata';

            await new Promise((resolve, reject) => {
                audioElement.onloadedmetadata = resolve;
                audioElement.onerror = reject;
            });

            const mins = Math.floor(audioElement.duration / 60)
            const seconds = Math.floor(audioElement.duration % 60)
            const duration = `${mins}:${seconds}`
            return duration

        } catch (error) {
            console.log(error);

        }

    }


    return (
        <div className='home'>
            <div>
                <div className="row">
                    <div className="col-md-3" style={{ padding: '0px' }} >
                        <Menu />
                    </div>
                    <div className="col-md-9" style={{ padding: '0px' }}>
                        <AuthMenu />
                        <div>
                            <h5 style={{ fontWeight: 'bold', color: 'white', marginTop: '15px', marginLeft: '15px' }}>Upload Your Music</h5>
                        </div>

                        <div className="container" >
                            <div className="row" style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
                                <div className="col-md-3" style={{ margin: '10px' }}>
                                    <div className="label" >
                                        <label style={{ flex: '1', fontWeight: 'bold', color: 'white', margin: '10px', textAlign: 'right', marginLeft: '10px' }} htmlFor="input1">Name</label>
                                    </div>
                                    <div className="input">
                                        <input style={{ border: 'none', borderRadius: '8px', width: '90%', margin: '10px', padding: '10px 10px ', boxSizing: 'border-box' }} type="text" id="input1" placeholder='Name' value={name} onChange={handleName} />
                                    </div>
                                </div>


                                <div className="col-md-3" style={{ margin: '10px' }}>

                                    <div className="label">
                                        <label style={{ flex: '1', fontWeight: 'bold', color: 'white', margin: '10px', textAlign: 'right', marginLeft: '10px' }} htmlFor="input2">Thumbnail</label>
                                    </div>
                                    <div className="input">
                                        <input style={{ border: 'none', borderRadius: '8px', width: '90%', margin: '10px', padding: '10px 10px', boxSizing: 'border-box' }} type="text" id="input2" placeholder='Thumbnail' onChange={handleThumbnail} />
                                    </div>
                                </div>

                            </div>
                            <div className="col-sm-4" style={{ margin: '0px 14px' }}>
                                <div className="label" >
                                    <label style={{ flex: '1', fontWeight: 'bold', color: 'white', marginBottom: '25px', textAlign: 'right', marginLeft: '5px' }} htmlFor="input3">Selected track</label>
                                </div>

                                {uploadedSongFileName ?
                                    <input
                                        type='text'
                                        value={(uploadedSongFileName || '').substring(0, 50)}
                                        readOnly
                                        style={{
                                            width: '90%',
                                            padding: '10px',
                                            border: 'none',
                                            borderRadius: '20px',
                                            fontWeight: "bold"
                                        }}
                                        id="input3"
                                    />
                                    :

                                    <CloudinaryUpload setTrackUrl={setTrackUrl} setUploadedSongFileName={setUploadedSongFileName} />
                                }

                            </div>

                            <div style={{ margin: '30px 14px' }}>
                                <button type='submit' onClick={handleOnSubmit} style={{ padding: '10px', border: 'none', borderRadius: '20px', fontWeight: "bold" }}>Submit song</button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>


        </div>
    );
};

export default UploadSong;
