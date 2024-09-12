// src/components/Popup.js

import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  color: black;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 1000;
`;

const PopupButton = styled.button`
  background-color: #1db954;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #1ed760;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Popup = ({ onClose }) => {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate('/signup');
  };
  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <>
      <Overlay onClick={onClose} />
      <PopupContainer>
        <p>You need to be logged in to create a playlist. Please sign up or log in.</p>
        <div className='s d-flex'>
        <PopupButton className='p m-3' onClick={handleSignupClick}>Sign Up</PopupButton> 
        <PopupButton className='p m-3' onClick={handleLoginClick}>Log in</PopupButton></div>
      </PopupContainer>
    </>
  );
};

export default Popup;
