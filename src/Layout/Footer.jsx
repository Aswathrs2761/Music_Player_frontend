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
    {currentSong && currentSong.name && currentSong.artist && (
      <div className="fixed bottom-0 left-0 w-full bg-zinc-950 border-t border-zinc-800 px-6 py-3">
        <div className="flex items-center justify-between">

          {/* Left - Song Info */}
          <div className="flex items-center gap-4 w-1/4">
            <img
              src={currentSong.thumbNail}
              alt="thumbnail"
              className="w-12 h-12 rounded-md object-cover"
            />

            <div>
              <p className="text-white text-sm font-medium truncate max-w-[150px]">
                {currentSong.name}
              </p>
              <p className="text-zinc-400 text-xs truncate max-w-[150px]">
                {currentSong.artist?.userName}
              </p>
            </div>
          </div>

          {/* Center - Controls */}
          <div className="flex flex-col items-center gap-2 w-2/4">

            <div className="flex items-center gap-6 text-zinc-400">

              {/* Shuffle */}
              <LuShuffle
                onClick={shuffle}
                className="cursor-pointer hover:text-indigo-400 transition"
                size={18}
              />

              {/* Previous */}
              <MdOutlineSkipPrevious
                onClick={previousSong}
                className="cursor-pointer hover:text-white transition"
                size={22}
              />

              {/* Play / Pause */}
              {isPaused ? (
                <FaCirclePlay
                  onClick={togglePlayPause}
                  className="cursor-pointer text-indigo-500 hover:text-indigo-400 transition"
                  size={34}
                />
              ) : (
                <FaPauseCircle
                  onClick={togglePlayPause}
                  className="cursor-pointer text-indigo-500 hover:text-indigo-400 transition"
                  size={34}
                />
              )}

              {/* Next */}
              <MdOutlineSkipNext
                onClick={nextSong}
                className="cursor-pointer hover:text-white transition"
                size={22}
              />

              {/* Repeat */}
              {repeatMode ? (
                <RiRepeatOneLine
                  onClick={toggleRepeatMode}
                  className="cursor-pointer text-indigo-400 transition"
                  size={20}
                />
              ) : (
                <IoMdRepeat
                  onClick={toggleRepeatMode}
                  className="cursor-pointer hover:text-indigo-400 transition"
                  size={20}
                />
              )}
            </div>
          </div>

          {/* Right - Duration */}
          <div className="w-1/4 flex justify-end">
            <p className="text-zinc-400 text-sm">
              {currentSong.duration}
            </p>
          </div>

        </div>
      </div>
    )}
  </>
);
};

export default Footer;







