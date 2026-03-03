import React, { Children, createContext, useContext, useEffect, useState } from 'react';


const currentSongContext = createContext()

const SongContext = ({children}) => {

    const [currentSong, setCurrentSong] = useState(null)

    const [soundPlayed, setSoundPlayed] = useState(null)

    const [songId , setSongId] = useState(null)

    const [isPaused, setIsPaused] = useState(false)

    const [allSongs, setAllSongs] = useState([])

    const [prevSongs, setPrevSongs] = useState([])



   
    return (
        <currentSongContext.Provider value={{currentSong, setCurrentSong ,soundPlayed, setSoundPlayed,songId , setSongId ,isPaused, setIsPaused,allSongs, setAllSongs,prevSongs, setPrevSongs}}>
            {children}
        </currentSongContext.Provider>
    );
};

const useCurrentSong = () =>useContext(currentSongContext)

export {useCurrentSong, SongContext} 