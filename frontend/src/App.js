import React from 'react';
import { BrowserRouter as Router, Route,Routes, Switch, BrowserRouter } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import styled from 'styled-components';
import Signup from './pages/Signup';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Searchpage from './pages/Searchpage';
import TeluguSongs from './pages/TeluguSongs';
import PodcastsPage from './pages/PodcastsPage';
import RecommendedSongsPage from './components/RecommendedSongsPage';
import { PlaylistProvider } from './context/PlaylistContext'; // Import PlaylistProvider
import MyPlaylistPage from './pages/MyPlaylistPage';
import PlaylistSongsPage from './pages/PlaylistSongsPage';
import { AuthProvider } from './context/AuthContext';
import HindiSongs from './pages/HindiSongs';
import AllPlaylistsPage from './components/AllPlaylistsPage';
import Footer from './Footer';
const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const App = () => {
  return (
    <PlaylistProvider>
   <AuthProvider>
<BrowserRouter>
   <Routes>
    <Route path='/' element={<HomePage/>}></Route>
    <Route path='/signup' element= {<Signup/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/search' element={<Searchpage/>}></Route>
    <Route path="/telugu" element={<TeluguSongs />} />
    <Route path='/hindi' element={<HindiSongs/>}></Route>
    <Route path='/browsepodcasts' element={<PodcastsPage/>}></Route>
    <Route path="/recommended-songs" element={<RecommendedSongsPage />} />
    <Route path="/my-playlist" element={<MyPlaylistPage />}></Route>
    <Route path='/my-playlists' element={<AllPlaylistsPage/>}></Route>
    <Route path="/playlists/:id" element={<PlaylistSongsPage />} />
    
   </Routes>
   </BrowserRouter></AuthProvider>
   </PlaylistProvider>
   
  );
};

export default App;
