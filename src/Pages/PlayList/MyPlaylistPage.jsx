import React, { useEffect, useState } from 'react';
import MainLayout from '../../Layout/MainLayout';
import axios from 'axios';
import { Backend_url } from '../../utils/Config';
import { useAuth } from '../../Context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';


const MyPlaylistPage = () => {

    const [myPlaylist, setMyPlaylist] = useState()
    const [auth,setAuth] = useAuth()

    const navigate = useNavigate()


    const getMyPlaylists = async( ) =>{
       try {
            const { data } = await axios.get(`${Backend_url}/api/playlist/getplaylist/artist`)
            setMyPlaylist(value =>data.playList)
          
       } 
       catch (error) 
       {
            console.log(error)
       }
    }

    const deletePlaylist = async (id) =>{
        try
        {
            await axios.delete(`${Backend_url}/api/playlist/deleteplaylist/${id}`)
            
            getMyPlaylists()


        }
        catch (error) 
       {
            console.log(error)
       }

    }


    useEffect(() => {
        if (auth.token) {
            getMyPlaylists()
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

    }, [auth,myPlaylist])


    return (
       <MainLayout>
       
        <div className="row">
    <div className='d-flex flex-wrap ' style={{ justifyContent: 'space-evenly', width: '100%' }}>
    {myPlaylist?.map((playList, index) => (
    <div key={index} onClick={(e) => {
        const targetClassList = e.target.classList;
        if (targetClassList.contains('delete-button')) 
            {
                if (confirm('Do You want to delete')) 
                    {
                        deletePlaylist(playList._id);
                    } 

                
            } 
        else {
            localStorage.setItem('currentPlaylist', JSON.stringify(playList._id));
            navigate('/playlistsongs');
        }
    }} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="card m-2 col-lg-2 songcard" style={{ backgroundColor: 'white',border:'none', borderRadius: '20px', width: '12rem',height: '15rem' }}>
            <div className="card-inner" style={{ height: '10rem' }}>
                <img src={playList.thumbNail} className="card-img" alt={playList.name} width={'60px'} height={'175px'} style={{ borderRadius: '20px' }} />
            </div>
            <div className="card-body" style={{ backgroundColor: 'black', color: 'grey', textAlign: 'center' }}>
                {(playList?.name || '').length > 10 ?
                    <p className="card-text" style={{ color: 'white', fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}> {(playList?.name || '').substring(0, 10)}...</p>
                    :
                    <p className="card-text" style={{ color: 'white', fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}> {(playList?.name || '').substring(0, 10)}</p>
                }
                <div>
                

                    <button className='delete-button' style={{ borderColor: "white", borderRadius: "20px", padding: "6px 15px", fontSize: '14px',marginTop:'10px', color: 'white', backgroundColor: 'black' }}>
                        delete
                    </button>
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

export default MyPlaylistPage;