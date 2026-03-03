import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentSong } from '../Context/SongContext';


const Logout = () => {
    const navigate = useNavigate()
    const {setCurrentSong} = useCurrentSong()

    useEffect(() =>{
        setCurrentSong(null)
        localStorage.removeItem('auth')
        navigate('/login')
    })
   

};

export default Logout;