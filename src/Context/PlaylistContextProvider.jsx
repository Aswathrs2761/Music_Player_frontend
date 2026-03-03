import React, { createContext, useContext, useState } from 'react';

const playistContext = createContext()

const PlaylistContextProvider = ({children}) => {

    const [playListId, setPlayListId] =  useState(null)

    return (
        <playistContext.Provider value={{playListId, setPlayListId}}>
            {children}
        </playistContext.Provider>
    );
};

const usePlayList = () => useContext(playistContext)


export {usePlayList , PlaylistContextProvider}




