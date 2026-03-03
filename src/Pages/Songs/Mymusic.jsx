import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Menu from '../../Layout/Menu';
import AuthMenu from '../../Layout/AuthMenu';
import axios from 'axios';
import { Backend_url } from '../../utils/Config';
import { useAuth } from '../../Context/AuthProvider';
import { Howl, Howler } from 'howler';
import { Navigate } from 'react-router-dom';
import MainLayout from '../../Layout/MainLayout';
import { useCurrentSong } from '../../Context/SongContext.jsx';

const Mymusic = () => {
    const [auth, setAuth] = useAuth();
    const [myMusic, setMyMusic] = useState([]);
    const [nowPlayingSong, setNowPlayingSong] = useState(null);


    const navigate = useNavigate()

    const {currentSong, setCurrentSong,allSongs, setAllSongs} = useCurrentSong()
    

    const getMyMusic = async () => {
        try 
        {
            const res = await axios.get(`${Backend_url}/api/song/get-mysong`);
            if (res.data.success === false) 
            {                 
                alert(res.data.message)
                navigate('/')
                return
                
            } 
            else {
            setMyMusic(res.data.mySongs);

            setAllSongs(res.data.mySongs);

                
            }
            
        } 
        catch (error) 
        {
            console.log(error);
        }
    };

   const deleteSong = async(id)=>{

    var result = confirm("Do you want to delete?");
    if (result) {
        try 
        {
            await axios.get(`${Backend_url}/api/song/deletesongbyid/${id}`);

            getMyMusic()
            setCurrentSong({})
        } 
        catch (error) 
        {
            console.log(error);            
        }
} 
        

    }
    




    useEffect(() => {
        if (auth.token) {
            getMyMusic();
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
                        {myMusic.map((item, index) => (

                            <Link key={index}  onClick={(e) => { 
                                if (!e.target.classList.contains('delete-button')) 
                                {                                   
                                    setCurrentSong(item); 
                                }
                                else
                                {                                        
                                    deleteSong(item._id)
                    
                                } 
                            }
                        }
                                
                                style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="row songrow" style={{ alignItems: 'center', padding: '10px', borderRadius: '6px' }}>
                                    <div className="col-2">
                                        <img src={item.thumbNail} style={{ height: '40px', width: '40px' }} alt="Thumbnail"></img>
                                    </div>
                                    <div className="col-6">
                                    {(item?.name || '').length > 12 ? 
                                        <p style={{paddingTop: '0px', margin: '0px', color: 'white' }}> {(item?.name || '').substring(0,12)}...</p> 
                                        :
                                        <p  style={{paddingTop: '0px', margin: '0px', color: 'white' }}> {(item?.name || '').substring(0,12)}</p> 
                                        } 

                                    {(item?.artist?.userName || '').length > 12 ? 
                                        <p style={{paddingTop: '0px', margin: '0px', color: 'white' }}> {(item?.artist?.userName || '').substring(0,12)}...</p> 
                                        :
                                        <p  style={{paddingTop: '0px', margin: '0px', color: 'white' }}> {(item?.artist?.userName || '').substring(0,12)}</p> 
                                        } 
                                
                                        
                                    </div>
                                    
                                    <div className='col-1'>
                                       {item.duration}
                                    </div>

                                    <div className='col-2'>
                                    <button className='delete-button' 
                                    style={{ borderColor: "white", borderRadius: "20px", padding: "6px 12px", fontSize: '14px', color: 'white',marginLeft:'10px', backgroundColor: 'black' }}>
    delete
</button>
</div>

                                </div>
                            </Link>
                        ))}
                    </div>


       </MainLayout>
                    
               
    );
};

export default Mymusic;
