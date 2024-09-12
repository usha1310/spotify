import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import homeIcon from '../images/home_icon.png';
import '../css/search.css';
import { PlaylistContext } from '../context/PlaylistContext';
import PlaylistSelectionModal from '../components/PlaylistSelectionModal'; // Import the modal

import naatuNaatu from '../images/naatu-naatu.jpg';
import buttaBomma from '../images/butta-bomma.jpg';
import samajavaragamana from '../images/samajavaragamana.jpg';
import ramulooRamulaa from '../images/ramuloo-ramulaa.jpg';
import neeKannuNeeliSamudram from '../images/nee-kannu-neeli-samudram.jpg';

const teluguSongs = [
  { id: 1, title: 'Naatu Naatu', artist: 'Rahul Sipligunj, Kaala Bhairava', album: 'RRR', duration: '3:05', image: naatuNaatu, audio: '/audio/naatu-naatu.mp3' },
  { id: 2, title: 'Butta Bomma', artist: 'Armaan Malik', album: 'Ala Vaikunthapurramuloo', duration: '3:40', image: buttaBomma, audio: '/audio/butta-bomma.mp3' },
  { id: 3, title: 'Samajavaragamana', artist: 'Sid Sriram', album: 'Ala Vaikunthapurramuloo', duration: '3:25', image: samajavaragamana, audio: '/audio/samajavaragamana.mp3' },
  { id: 4, title: 'Ramuloo Ramulaa', artist: 'Anurag Kulkarni, Mangli', album: 'Ala Vaikunthapurramuloo', duration: '3:15', image: ramulooRamulaa , audio: '/audio/ramuloo-ramulaa.mp3'},
  { id: 5, title: 'Nee Kannu Neeli Samudram', artist: 'Javed Ali, Srikanth Chandra', album: 'Rangamarthanda', duration: '4:00', image: neeKannuNeeliSamudram , audio: '/audio/nee-kannu-neeli-samudram.mp3'},
];

const TeluguSongs = () => {
  const [currentSong, setCurrentSong] = useState(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const audioRef = useRef(null);
  const navigate = useNavigate(); 
  const { playlists, addSongToPlaylist, createPlaylist } = useContext(PlaylistContext); 

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
      }
    }
  }, [currentSong, isPlaying]);

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentSong(null);
  };

  const handleAddToPlaylist = (song) => {
    setSelectedSong(song);
    setShowModal(true); // Show modal to select or create a playlist
  };

  const handleSelectPlaylist = (playlistId) => {
    addSongToPlaylist(playlistId, selectedSong); // Use context to add song to the selected playlist
    alert(`"${selectedSong.title}" added to your playlist!`);
    setShowModal(false); // Close modal after adding
    navigate('/my-playlist'); // Navigate to "My Playlist" page
  };

  const handleCreateNewPlaylist = (name) => {
    const newPlaylistId = createPlaylist(name); // Use context to create a new playlist
    addSongToPlaylist(newPlaylistId, selectedSong); // Add the song to the newly created playlist
    alert(`Playlist "${name}" created and "${selectedSong.title}" added to it!`);
    setShowModal(false); // Close modal after creating and adding
    navigate('/my-playlist'); // Navigate to "My Playlist" page
  };

  return (
    <div className='box-0'>
      <div className='h d-flex'>
        <HomeIcon to="/">
          <img src={homeIcon} alt="Home" />
        </HomeIcon>
        <h2 className='p-3 ps-5 pe-5 text-white'>Telugu Songs</h2>
      </div>

      <div className='song-list'>
        {teluguSongs.map((song) => (
          <div key={song.id} className='song-item'>
            <img src={song.image} alt={song.title} className='song-image' />
            <div className='song-details'>
              <h4 className='song-title'>{song.title}</h4>
              <p className='artist'>{song.artist}</p>
              <p className='album'>{song.album}</p>
              <p className='duration'>{song.duration}</p>
            </div>
            <button className='play-button' onClick={() => handlePlayPause(song)}>
              {currentSong && currentSong.id === song.id && isPlaying ? '⏸' : '▶'}
            </button>
            <button className='add-button' onClick={() => handleAddToPlaylist(song)}>
              ➕ Add to Playlist
            </button>
          </div>
        ))}
        {/* Audio player to play the current song */}
        <audio
          ref={audioRef}
          onEnded={handleEnded}
        />
        <div className='p-3'>
          <Link to="/search" className='text-decoration-none text-white'>
            Back to Categories
          </Link>
        </div>
      </div>
      {showModal && (
        <PlaylistSelectionModal
          playlists={playlists}
          onClose={() => setShowModal(false)}
          onSelectPlaylist={handleSelectPlaylist}
          onCreateNewPlaylist={handleCreateNewPlaylist}
        />
      )}
    </div>
  );
};

export default TeluguSongs;

const HomeIcon = styled(Link)`
  width: 20px;
  height: -10px;
  margin-right: 2px;
  display: block;
  cursor: pointer;
`;
