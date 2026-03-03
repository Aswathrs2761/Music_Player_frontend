import React, { useState, useEffect } from 'react';
import Menu from '../Layout/Menu';
import AuthMenu from '../Layout/AuthMenu';
import axios from 'axios';
import { useAuth } from '../Context/AuthProvider';
import { Backend_url } from '../utils/Config';
import { Link } from 'react-router-dom';
import { Howl, Howler } from 'howler';
import { LuShuffle } from "react-icons/lu";
import { MdOutlineSkipPrevious } from "react-icons/md";
import { MdOutlineSkipNext } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { IoMdRepeat } from "react-icons/io";
import { FaPause } from "react-icons/fa";
import Footer from './Footer';
import { useCurrentSong } from '../Context/SongContext';


const MainLayout = ({children}) => {
    const [myMusic, setMyMusic] = useState([])

    const [auth, setAuth] = useAuth()

    const [currentSound, setCurrentSound] = useState(null)

    const [isPaused, setIspaused] = useState(true)

    const {currentSong, setCurrentSong} = useCurrentSong()

    

    const layoutstyle ={
        height: currentSong ? '98%' :'100%',
        overflowY: 'auto',
        backgroundColor: 'black',
        color: 'white' 
    }


    const getMyMusic = async () => {
        try {
            const res = await axios.get(`${Backend_url}/api/song/get-allsongs`);
            if (res.data.success === false) {
                alert(res.data.message)
                navigate('/')
                return

            }
            else {
                setMyMusic(res.data.songs);



            }

        }
        catch (error) {
            console.log(error);
        }
    };

    const pauseMusic = () =>{
        currentSound.pause()
    }

    const togglePlayPause = (track) =>{
        if (isPaused) 
        {
            playMusic(track)            
            setIspaused(false)
            
        }
        else
        {
            pauseMusic()
            setIspaused(true)
            
           
        }
    }


    const playMusic = (songSrc) => {
        if (currentSound) {
            currentSound.stop()
        }

        let sound = new Howl({
            src: [songSrc],
            html5: true
        });

        setCurrentSound(sound)
        sound.play();


    }


    useEffect(() => {
        if (auth.token) {
            getMyMusic();

        }

    }, [auth.token]);
    return (
        <div>
            <div>
            <div className='home' style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div style={layoutstyle}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3 p-0">
                            <Menu />
                        </div>
                        <div className="col-md-9 p-0 authmenu" style={{ height: '100%' }}>
                            <AuthMenu />
                           
                            
                            <main style={{ maxWidth: '98%',
                             padding: '10px',
                             
                              }}>

                               
                                {children}



                            </main> 
                        </div>
                    </div>
                </div>
            </div>
            {currentSong &&
            <Footer />
}

        </div>
        </div>
            
        </div>
    );
};
export default MainLayout;








