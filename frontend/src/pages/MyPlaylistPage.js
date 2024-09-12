// src/pages/MyPlaylistPage.js
import React, { useContext, useState } from 'react';
import { PlaylistContext } from '../context/PlaylistContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PlaylistContainer = styled.div`
  margin: 20px;
  color: white;
  display: flex;
  flex-direction: column;
`;

const PlaylistItem = styled.div`
  background-color: #282828;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  cursor: pointer; /* Cursor pointer to indicate clickable items */
  position: relative; /* Required for positioning dropdown */
`;

const PlaylistHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ThreeDotsButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1.2em;
  padding: 0 10px;
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 30px;
  right: 10px;
  background-color: #3a3a3a;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  z-index: 1;
  display: ${(props) => (props.show ? 'block' : 'none')};
`;

const DropdownItem = styled.div`
  padding: 10px;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #4a4a4a;
  }
`;

const MyPlaylistPage = () => {
  const { playlists, editPlaylistName, deletePlaylist } = useContext(PlaylistContext);
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null); // State to manage dropdown visibility

  const handleEditClick = (id, currentName) => {
    const newName = prompt('Enter new playlist name:', currentName);
    if (newName) {
      editPlaylistName(id, newName);
    }
    setActiveDropdown(null); // Close the dropdown after action
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this playlist?')) {
      deletePlaylist(id);
    }
    setActiveDropdown(null); // Close the dropdown after action
  };

  const handlePlaylistClick = (id) => {
    navigate(`/playlists/${id}`);
  };

  const toggleDropdown = (playlistId) => {
    setActiveDropdown((prevId) => (prevId === playlistId ? null : playlistId));
  };

  return (
    <PlaylistContainer>
      <h2>My Playlists</h2>
      {playlists.length > 0 ? (
        playlists.map((playlist) => (
          <PlaylistItem key={playlist.id} onClick={() => handlePlaylistClick(playlist.id)}>
            <PlaylistHeader>
              <span>{playlist.name}</span>
              <ThreeDotsButton onClick={(e) => { e.stopPropagation(); toggleDropdown(playlist.id); }}>
                &#8942;
              </ThreeDotsButton>
              <DropdownMenu show={activeDropdown === playlist.id}>
                <DropdownItem onClick={(e) => { e.stopPropagation(); handleEditClick(playlist.id, playlist.name); }}>Edit</DropdownItem>
                <DropdownItem onClick={(e) => { e.stopPropagation(); handleDeleteClick(playlist.id); }}>Delete</DropdownItem>
              </DropdownMenu>
            </PlaylistHeader>
          </PlaylistItem>
        ))
      ) : (
        <p>No playlists available. Please create a new playlist.</p>
      )}
    </PlaylistContainer>
  );
};

export default MyPlaylistPage;
