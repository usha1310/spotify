import React, { useContext } from 'react';
import styled from 'styled-components';
import display from '../images/cover.png';
import Footer from '../Footer';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import profile from '../images/default-user.jpg'
const MainContentContainer = styled.div`
  flex: 1;
  background-color: #121212;
  color: white;
  padding: 20px;
  height: 100vh;
  margin-top: 0px;
`;

const TopRightButtons = styled.div`
  position: absolute;
  gap: 20px; /* Adjusted gap for better spacing */
  right: 20px;
  display: flex; /* Align buttons in a row */
`;

const RoundedButton = styled.a`
  background-color: black;
  color: white;
  text-decoration: none;
  display: inline-block;
  padding: 10px 10px;
  border-radius: 20px;
  margin-left: 10px;
  cursor: pointer;

  &:hover {
    background-color: #1ed760;
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
`;
const UserImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

const MainContent = () => {
  const { user, logout } = useContext(AuthContext); // Get user and logout from context

  return (
    <MainContentContainer>
      <TopRightButtons>
        {user ? ( // If user is logged in, display username and logout button
          <>
            <RoundedButton>
            <UserImage src={profile}  />
              {user.username}</RoundedButton>
            <RoundedButton onClick={logout}>Logout</RoundedButton>
          </>
        ) : ( // Otherwise, display the Login and Signup buttons
          <>
            <RoundedButton href="/signup">Signup</RoundedButton>
            <RoundedButton href="/login">Login</RoundedButton>
          </>
        )}
      </TopRightButtons>
      <h1>Welcome to Spotify</h1>
      <p>Explore your favorite music.</p>
      <img className="w-100 h-75" src={display} alt="Cover" />
      <Footer/>
    </MainContentContainer>
    
  );
};

export default MainContent;
