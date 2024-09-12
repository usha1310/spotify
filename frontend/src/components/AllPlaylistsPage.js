import React, { useContext, useState } from 'react';
import { PlaylistContext } from '../context/PlaylistContext';
import styled from 'styled-components';

const PlaylistContainer = styled.div`
  margin: 20px;
  color: white;
  display: flex;
  flex-direction: column;
`;

const PlaylistItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #282828;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  position: relative; /* Necessary for positioning the dropdown */
`;

const DropdownButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 18px;
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  top: 30px;
  background-color: #333;
  border-radius: 5px;
  padding: 5px;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')}; /* Conditionally display menu */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const PlaylistButton = styled.button`
  background-color: #1db954;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px 0;
  width: 100%;
  text-align: left;

  &:hover {
    background-color: #1ed760;
  }
`;

const AllPlaylistsPage = () => {
  const { playlists, editPlaylistName, deletePlaylist } = useContext(PlaylistContext);
  const [dropdownOpen, setDropdownOpen] = useState({});

  const handleEditClick = (id, currentName) => {
    const newName = prompt('Enter new playlist name:', currentName);
    if (newName) {
      editPlaylistName(id, newName);
    }
    setDropdownOpen((prevState) => ({ ...prevState, [id]: false })); // Close dropdown after action
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this playlist?')) {
      deletePlaylist(id);
    }
    setDropdownOpen((prevState) => ({ ...prevState, [id]: false })); // Close dropdown after action
  };

  const toggleDropdown = (id) => {
    setDropdownOpen((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  return (
    <PlaylistContainer>
      <h2>My Playlists</h2>
      {playlists.map((playlist) => (
        <PlaylistItem key={playlist.id}>
          <span>{playlist.name}</span>
          <div>
            <DropdownButton onClick={() => toggleDropdown(playlist.id)}>⋮</DropdownButton>
            <DropdownMenu isOpen={dropdownOpen[playlist.id]}>
              <PlaylistButton onClick={() => handleEditClick(playlist.id, playlist.name)}>Edit</PlaylistButton>
              <PlaylistButton onClick={() => handleDeleteClick(playlist.id)}>Delete</PlaylistButton>
            </DropdownMenu>
          </div>
        </PlaylistItem>
      ))}
    </PlaylistContainer>
  );
};

export default AllPlaylistsPage;
