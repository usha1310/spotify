import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import homeIcon from '../images/home_icon.png';
import searchIcon from '../images/search.png';
import spotifyLogo from '../images/spotify.png';
import { AuthContext } from '../context/AuthContext';
import { PlaylistContext } from '../context/PlaylistContext'; // Import the PlaylistContext
import Popup from './Popup'; 

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #040404;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
`;
const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  color: white;
`;

const SpotifyLogo = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  margin-left: 10px;
`;

const SidebarOption = styled(Link)`
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  &:hover {
    background-color: #282828;
  }
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const ActionButton = styled.button`
  background-color: #1db954;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  margin-top: 10px;
`;

const ScrollingSection = styled.div`
  margin-top: 20px;
  width: 100%;
  padding: 0 20px;
  overflow-y: auto;
  flex: 1;
`;

const Section = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  color: white;
  margin-bottom: 10px;
`;

const SidebarFooter = styled.div`
  width: 100%;
  padding-top: 50px;
  padding: 20px;
  background-color: #181818;
  text-align: center;
  color: white;
`;
const Sidebar = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); 
  const { playlists, createPlaylist } = useContext(PlaylistContext); 
  const [showPopup, setShowPopup] = useState(false);

  const handleCreatePlaylistClick = () => {
    if (user) {
      const playlistName = prompt('Enter Playlist Name:');
      if (playlistName) {
        createPlaylist(playlistName);
      }
    } else {
      setShowPopup(true); // Show popup if not logged in
    }
  };

  const handleGoToMyPlaylistsClick = () => {
    navigate('/my-playlist'); // Navigate to the page showing all playlists
  };

  return (
    <SidebarContainer>
      <SidebarHeader>
        <SpotifyLogo src={spotifyLogo} alt="Spotify" />
        <h1>Spotify</h1>
      </SidebarHeader>
      <SidebarOption to="/">
        <Icon src={homeIcon} alt="Home" />
        Home
      </SidebarOption>
      <SidebarOption to="/search">
        <Icon src={searchIcon} alt="Search" />
        Search
      </SidebarOption>
      <SidebarOption to="/your-library">Your Library</SidebarOption>
      <ScrollingSection>
        <Section>
          <SectionTitle>Create your own playlist</SectionTitle>
          <ActionButton onClick={handleCreatePlaylistClick}>Create Playlist</ActionButton>
          {playlists.length > 0 && (
            <ActionButton onClick={handleGoToMyPlaylistsClick}>Go to My Playlists</ActionButton>
          )}
        </Section>
        <Section>
          <SectionTitle>Let's find some podcasts to follow</SectionTitle>
          <ActionButton onClick={() => navigate('/browsepodcasts')}>Browse Podcasts</ActionButton>
        </Section>
      </ScrollingSection>
      <SidebarFooter>
        <p>&copy; 2024 Spotify Clone. All rights reserved.</p>
        <p>Contact us: support@spotifyclone.com</p>
      </SidebarFooter>
      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
    </SidebarContainer>
  );
};

export default Sidebar;