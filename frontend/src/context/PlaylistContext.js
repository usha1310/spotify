import React, { createContext, useState } from 'react';

// Create the context
export const PlaylistContext = createContext();

// Define the PlaylistProvider component
export const PlaylistProvider = ({ children }) => {
  const [playlists, setPlaylists] = useState([]);

  // Function to create a new playlist
  const createPlaylist = (name) => {
    const newPlaylist = { id: playlists.length + 1, name, songs: [] }; // Generate a unique ID based on the length of the playlists array
    setPlaylists((prevPlaylists) => [...prevPlaylists, newPlaylist]); // Use functional state update to ensure correct state value
  };

  // Function to add a song to a specific playlist
  const addSongToPlaylist = (playlistId, song) => {
    setPlaylists((prevPlaylists) =>
      prevPlaylists.map((playlist) =>
        playlist.id === playlistId
          ? { ...playlist, songs: [...playlist.songs, song] }
          : playlist
      )
    );
  };

  // Function to edit a playlist's name
  const editPlaylistName = (playlistId, newName) => {
    setPlaylists((prevPlaylists) =>
      prevPlaylists.map((playlist) =>
        playlist.id === playlistId ? { ...playlist, name: newName } : playlist
      )
    );
  };

  // Function to delete a playlist
  const deletePlaylist = (playlistId) => {
    setPlaylists((prevPlaylists) =>
      prevPlaylists.filter((playlist) => playlist.id !== playlistId)
    );
  };

  // Provide the context values to the children components
  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        createPlaylist,
        addSongToPlaylist,
        editPlaylistName,
        deletePlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};
