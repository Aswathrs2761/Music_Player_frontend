import React, { useEffect, useState } from 'react';
import MainLayout from '../../Layout/MainLayout';
import axios from 'axios';
import { Backend_url } from '../../utils/Config';
import { Link, useNavigate } from 'react-router-dom';
import { useCurrentSong } from '../../Context/SongContext';
import { usePlayList } from '../../Context/PlaylistContextProvider';

const AllPlaylist = () => {

    
    const navigate = useNavigate();

    const { setPlayListId } = usePlayList()

    const [allPlaylists, setAllPlaylists] = useState()

   const getAllPlaylist = async() =>
    { 
        try {
            const {data} = await axios.get(`${Backend_url}/api/playlist/getallplaylist`)
            setAllPlaylists(data.playlist);
        }
        catch (error) {
            console.log(error);
        }

    }

   

    useEffect(()=>{
        getAllPlaylist()
    },[])

    return (
        <MainLayout>
        <div style={{fontSize: '22px', fontWeight : 'bold',marginBottom: '20px'}}>
            All Playlists
        </div>              
        <div className="row">

            <div className='d-flex flex-wrap ' style={{ justifyContent: 'space-evenly', width: '100%' }}>
                {allPlaylists?.map((playlist, index) => (
                    <div onClick={() => {
                            localStorage.setItem('currentPlaylist', JSON.stringify(playlist._id));

                            setPlayListId(playlist._id)

                            navigate('/playlist-songs')

                        }} 
                        key={index} className="card m-2 col-xl-1 songcard" style={{backgroundColor: 'black', borderRadius: '20px', border : 'none',width: '10rem' }}>

                        <div className="card-inner">
                            <img src={playlist.thumbNail}
                                className="card-img "
                                alt={playlist.name}
                                height={'200px'} width={'60px'} 
                                style={{borderRadius : '20px'}}/>
                        </div>
                        <div className="card-body" style={{backgroundColor:'black', color: 'grey' }} >
                        
                                
                                {(playlist?.name || '').length > 12 ? 
                                <p className="card-text" style={{textAlign: 'center',color:'white', fontSize: '16px', fontWeight: 'bold',marginBottom : '5px'}}> {(playlist?.name || '').substring(0,12)}...</p> 
                                :
                                <p className="card-text" style={{textAlign: 'center',color:'white', fontSize: '16px', fontWeight: 'bold',marginBottom : '5px' }}> {(playlist?.name || '').substring(0,12)}</p> 
                                }
                                              

                        </div>

                    </div>
                ))}
            </div>
        </div>
    
</MainLayout>
    );
};

export default AllPlaylist;






