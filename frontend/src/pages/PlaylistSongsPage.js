// src/pages/PlaylistSongsPage.js
import React, { useContext, useState, useRef, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PlaylistContext } from '../context/PlaylistContext';
import styled from 'styled-components';

const SongsContainer = styled.div`
  margin: 20px;
  color: white;
  display: flex;
  flex-direction: column;
`;

const SongItem = styled.div`
  background-color: #383838;
  padding: 10px;
  margin-top: 5px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const PlayButton = styled.button`
  background-color: #1db954;
  color: white;
  border: none;
  padding: 5px;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: #1ed760;
  }
`;

const AddSongButton = styled.button`
  background-color: #1db954;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  width: 150px;

  &:hover {
    background-color: #1ed760;
  }
`;

const BottomPlayer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #282828;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
`;

const PlaylistSongsPage = () => {
  const { id } = useParams(); // Get playlist ID from the URL
  const { playlists } = useContext(PlaylistContext);
  const navigate = useNavigate();

  const [currentSong, setCurrentSong] = useState(null); // To track the current song being played
  const [isPlaying, setIsPlaying] = useState(false); // To track play/pause state
  const audioRef = useRef(null); // Reference to the audio player

  // Find the selected playlist by ID
  const playlist = playlists.find((playlist) => playlist.id === parseInt(id));

  const handlePlayPause = (song) => {
    if (currentSong && currentSong.id === song.id) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.audio;
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentSong, isPlaying]);

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentSong(null);
  };

  const handleAddSongs = () => {
    navigate(`/search?playlistId=${id}`); // Redirect to search page with playlist ID
  };

  if (!playlist) {
    return <p>Playlist not found!</p>;
  }

  return (
    <SongsContainer>
      <h2>{playlist.name}</h2>
      {playlist.songs.length > 0 ? (
        playlist.songs.map((song, index) => (
          <SongItem key={index}>
            <PlayButton onClick={() => handlePlayPause(song)}>
              {currentSong && currentSong.id === song.id && isPlaying ? '⏸' : '▶'}
            </PlayButton>
            <span>{song.title} by {song.artist}</span>
          </SongItem>
        ))
      ) : (
        <p>No songs in this playlist.</p>
      )}
      
      <AddSongButton onClick={handleAddSongs}>Add Songs</AddSongButton> {/* Add Songs Button */}
      <Link onClick={() => navigate(-1)} className=' p-3 text-decoration-none'>Back to My Playlists</Link>
      {/* Bottom player */}
      {currentSong && (
        <BottomPlayer>
          <span>Now Playing: {currentSong.title} by {currentSong.artist}</span>
          <audio ref={audioRef} onEnded={handleEnded} />
        </BottomPlayer>
      )}
    </SongsContainer>
  );
};

export default PlaylistSongsPage;
