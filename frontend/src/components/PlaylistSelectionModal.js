// src/components/PlaylistSelectionModal.js
import React, { useState } from 'react';
import '../css/PlaylistSelectionModal.css'; // Import the new CSS file

const PlaylistSelectionModal = ({ playlists, onClose, onSelectPlaylist, onCreateNewPlaylist }) => {
  const [newPlaylistName, setNewPlaylistName] = useState('');

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      onCreateNewPlaylist(newPlaylistName);
      setNewPlaylistName('');
    } else {
      alert('Please enter a name for the new playlist.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">Select Playlist</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="playlist-selection">
          {playlists.length > 0 ? (
            <div className="playlist-options">
              {playlists.map((playlist) => (
                <button key={playlist.id} onClick={() => onSelectPlaylist(playlist.id)}>
                  {playlist.name}
                </button>
              ))}
            </div>
          ) : (
            <p>No playlists available. Create a new one below.</p>
          )}
        </div>
        <div className="create-playlist-section">
          <input
            type="text"
            className="input-field"
            placeholder="New Playlist Name"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
          />
          <button className="submit-button" onClick={handleCreatePlaylist}>
            Create Playlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistSelectionModal;
