import React, { useState, useRef, useEffect ,useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import homeIcon from '../images/home_icon.png';
import '../css/search.css'; // Reusing the same CSS file for consistency
import { PlaylistContext } from '../context/PlaylistContext';
import PlaylistSelectionModal from '../components/PlaylistSelectionModal'; // Import the modal

import tumHiHo from '../images/tum-hi-ho.jpeg';  // Replace with actual image paths
import sajnire from '../images/sajni-re.jpg'; // Replace with actual image paths
import terevaaste from '../images/tere-vaaste.jpeg'; // Replace with actual image paths
import channa from '../images/channa-mereya.jpg';
import apna from '../images/apna-bana-le.jpg'
// List of Hindi songs with audio file paths
const hindiSongs = [
  { id: 1, title: 'Tum Hi Ho', artist: 'Arijit Singh', album: 'Aashiqui 2', duration: '4:22', image: tumHiHo, audio: '/audio/tum-hi-ho.mp3' },
  { id: 2, title: 'Sajni Re', artist: 'Arijit Singh', album: 'Laapata Ladies', duration: '3:53', image: sajnire, audio: '/audio/sajni-re.mp3' },
  { id: 3, title: 'Tere Vaaste', artist: 'Sachin-Jigar', album: 'Zara Hatke Zara Bachke', duration: '3:09', image: terevaaste, audio: '/audio/tere-vaaste.mp3' },
  { id: 4, title: 'Channa Mereya', artist: 'Arijit Singh', album: 'Bhediya', duration: '4:04', image: channa, audio: '/audio/channa-mereya.mp3' },
  { id: 5, title: 'Apna Bana le', artist: 'Arijit Singh', album: 'Bhediya', duration: '4:05', image: apna, audio: '/audio/apna-bana-le.mp3' },
];

const HindiSongs = () => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const audioRef = useRef(null);
  const navigate = useNavigate();
  const { playlists, addSongToPlaylist ,createPlaylist } = useContext(PlaylistContext); 


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
        <h2 className='p-3 ps-5 pe-5 text-white'>Hindi Songs</h2>
      </div>

      <div className='song-list'>
        {hindiSongs.map((song) => (
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
          ref={audioRef} // Attach the ref to the audio element
          onEnded={handleEnded} // Stop playing when the song ends
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

export default HindiSongs;

const HomeIcon = styled(Link)`
  width: 20px;
  height: -10px;
  margin-right: 2px;
  display: block;
  cursor: pointer;
`;
