import React, { useState, useEffect, useRef } from 'react';
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
import { FaCirclePlay } from "react-icons/fa6";
import { IoMdRepeat } from "react-icons/io";
import { FaPauseCircle } from "react-icons/fa";
import { MdRepeatOne } from "react-icons/md";
import { useCurrentSong } from '../Context/SongContext';
import { RiRepeatOneLine } from "react-icons/ri";



const Footer = () => {


    const [auth, setAuth] = useAuth()



    const { currentSong, setCurrentSong, soundPlayed, setSoundPlayed, songId, setSongId, isPaused, setIsPaused, allSongs, setAllSongs, prevSongs, setPrevSongs } = useCurrentSong()



    const [repeatMode, setRepeatMode] = useState(false)

    const repeatModeRef = useRef(repeatMode);


    const allSongsRef = useRef(allSongs);


    useEffect(() => {
        repeatModeRef.current = repeatMode;

    }, [repeatMode]);




    const playMusic = () => {
        if (soundPlayed) {
            soundPlayed.play();
        }
    };

    const changeSong = (track, allSongs) => {
        if (soundPlayed) {
            soundPlayed.stop()
        }

        if (isPaused) {
            setIsPaused(data => false)
        }

        let sound = new Howl({
            src: [track],
            html5: true,
            onend: () => {
                setIsPaused(true);

                if (repeatModeRef.current) {
                    changeSong(currentSong.track);
                    setRepeatMode(prev => {
                        repeatModeRef.current = !repeatMode
                        return repeatMode
                    })

                }

                else {
                    const index = allSongsRef.current.findIndex(item => item._id === currentSong._id);
                    if (index + 1 < allSongsRef.current.length) {
                        setCurrentSong(prevSong => {
                            const newIndex = allSongsRef.current.findIndex(item => item._id === prevSong._id);
                            return allSongsRef.current[newIndex + 1];
                        });
                        setIsPaused(true);
                    }
                }
            },

        })
        setSoundPlayed(sound)
        sound.play()
        setIsPaused(false)
        setPrevSongs(songs => [...songs, currentSong])





    }


    useEffect(() => {


        if (songId === currentSong._id) {
            return
        }

        if (currentSong) {

            changeSong(currentSong.track, allSongs)

        }
        setSongId(currentSong._id)




    }, [currentSong])




    const togglePlayPause = () => {
        if (isPaused) {
            playMusic()
            setIsPaused(false);
        }
        else {
            pauseMusic()
            setIsPaused(true);
        }
    };

    const pauseMusic = () => {
        if (soundPlayed) {
            soundPlayed.pause();
        }
    };


    const nextSong = () => {
        const index = allSongs.findIndex(item => item._id === currentSong._id)


        if (index + 1 < allSongs.length) {
            setCurrentSong(allSongs[index + 1])

        }
        if (index + 1 == allSongs.length) {
            return
        }

    }

    const previousSong = () => {
        if (prevSongs.length > 1) {
            const previous = prevSongs[prevSongs.length - 2]

            setCurrentSong(previous)

            setPrevSongs(prevSongs => prevSongs.slice(0, prevSongs.length - 1));

        }

    }

    const toggleRepeatMode = () => {

        setRepeatMode(prevMode => !prevMode);
    };






    // const shuffle = () =>{
    //     let shuffledArray = []
    //     let usedIndexes = []

    //     for(let i = 0 ;i < allSongs.length ; i++)
    //         {
    //             const randomNumber =  Math.floor(Math.random() * allSongs.length)  
    //             if (!usedIndexes.includes(randomNumber)) {
    //                 shuffledArray.push(allSongs[randomNumber])
    //                 usedIndexes.push(randomNumber)                    
    //             }              
    //         }
    //         console.log(shuffledArray);

    // }


    const shuffle = () => {
        const shuffledArray = [...allSongs];

        for (let i = allSongs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }



        setAllSongs(shuffledArray);




    };

    useEffect(() => {

        allSongsRef.current = allSongs;

    }, [allSongs]);



    const handleHeartClick = (e, songId) => {

        const index = likedSongs.indexOf(songId);
        e.stopPropagation();

        if (index === -1) {
            console.log("no");
            setLikedSongs(prevLikedSongs => {
                const newLikedSongs = [...prevLikedSongs, songId];
                addOrRemoveLikes(newLikedSongs)
                return newLikedSongs;
            });
        }

        else {
            const updatedLikedSongs = likedSongs.filter((song, i) => i !== index);
            setLikedSongs(updatedLikedSongs); // Update likedSongs state
            addOrRemoveLikes(updatedLikedSongs);
        }

    };








    return (
        <>
            {currentSong && currentSong.name && currentSong.artist &&
                <div style={{ height: '10%' }}>
                    <div className='container' >

                        <div style={{ justifyContent: 'space-between', alignItems: 'center',padding: '10px', borderRadius: '6px' }}>
                            <div className="row" style={{ alignItems: 'center' }}>
                                <div className='col-2'>
                                    <img src={currentSong.thumbNail} style={{ height: '40px', width: '40px' }} alt="Thumbnail"></img>
                                </div>

                                <div className='col-2' >
                                    <div className="row">
                                        {(currentSong?.name || '').length > 9 ?
                                            <p style={{ fontSize: '14px', fontWeight: 'bold', padding: '0px', margin: '0px', color: 'white' }}>{(currentSong?.name || '').substring(0, 9)}...</p>
                                            :
                                            <p style={{ fontSize: '14px', fontWeight: 'bold', padding: '0px', margin: '0px', color: 'white' }}> {(currentSong?.name || '').substring(0, 9)}</p>
                                        }

                                    </div>


                                    <div className="row" style={{ alignItems: 'center' }}>
                                        {(currentSong?.artist?.userName || '').length > 11 ?
                                            <p style={{ fontSize: '10px', padding: '0px', margin: '0px', color: 'whitesmoke' }}>{(currentSong?.artist?.userName || '').substring(0, 11)}...</p>
                                            :
                                            <p style={{ fontSize: '10px', padding: '0px', margin: '0px', color: 'whitesmoke' }}>{(currentSong?.artist?.userName || '').substring(0, 11)}</p>
                                        }
                                    </div>
                                </div>

                                <div className='col-2'>
                                    <p style={{color:'white',fontSize:'15px',marginLeft:'10px',alignItems: 'center' }}>{currentSong.duration}</p>
                                </div>                                


                                <div className='col-6' style={{ padding: '0px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px', }} >
                                        <div className='playicons'>
                                            <LuShuffle id='shuffle' onClick={() => {
                                                const shuffleid = document.getElementById('shuffle')
                                                shuffleid.style.color = 'red'

                                                shuffle()
                                            }} />

                                        </div>

                                        <div className='playicons'>
                                            <MdOutlineSkipPrevious onClick={previousSong} />
                                        </div>


                                        <div className='playicons'>

                                            <div className='playicons'>
                                                {isPaused ?
                                                    <FaCirclePlay style={{ fontSize: '20px' }} onClick={() => { togglePlayPause() }} />
                                                    :
                                                    <FaPauseCircle style={{ fontSize: '20px' }} onClick={() => { togglePlayPause() }} />
                                                }
                                            </div>

                                        </div>

                                        <div className='playicons'>
                                            <MdOutlineSkipNext onClick={nextSong} />
                                        </div>

                                        <div className='playicons' onClick={() => {
                                            toggleRepeatMode()

                                        }}>

                                            {repeatMode ? <RiRepeatOneLine /> : <IoMdRepeat />}

                                        </div>



                                    </div>

                                    

                                </div>
                               

                            </div>


                        </div>

                    </div>
                </div>
            }

        </>

    );
};

export default Footer;







