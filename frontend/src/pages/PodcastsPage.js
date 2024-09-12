// src/components/PodcastsPage.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Import Link for navigation
import podcast1 from '../images/podcast1.png';
import podcast2 from '../images/podcast2.png';
import podcast3 from '../images/podcast3.jpeg';
import podcast4 from '../images/podcasts4.jpeg';
import podcast5 from '../images/podcast5.jpeg';
import playButton from '../images/play-button.png'; // Add a play button image
import homeIcon from '../images/home_icon.png'; // Add a home icon image
import { Icon } from '@mui/material';

const PodcastsPageContainer = styled.div`
padding-top:-20px;
  padding: 20px;
  color: white;
  background-color: #121212;
`;

const HeadingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const HomeIcon = styled(Link)`
  width: 20px;
  height: -10px;
  
  margin-right: 2px;
  display: block;
  cursor: pointer;
`;

const Heading = styled.h2`
  margin: 0;
  padding-left:50px;
`;

const PodcastItem = styled.div`
  background-color: black;
  color: white;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #1ed760;
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
`;

const PodcastImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  object-fit: cover;
`;

const PodcastDetails = styled.div`
  margin-left: 15px;
`;

const PodcastTitle = styled.h3`
  margin: 0;
`;

const PodcastDescription = styled.p`
  margin: 5px 0;
`;

const PlayButton = styled.img`
  width: 40px;
  height: 40px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  cursor: pointer;
`;


const PodcastsPage = () => {
  return (
    <PodcastsPageContainer>
      <HeadingContainer>
        <HomeIcon to="/">
          <img src={homeIcon} alt="Home" />
        </HomeIcon>
        <Heading>Popular Podcasts</Heading>
      </HeadingContainer>
      <PodcastItem>
        <PodcastImage src={podcast1} alt="The Daily" />
        <PodcastDetails>
          <PodcastTitle>The Daily</PodcastTitle>
          <PodcastDescription>Daily news and analysis from The New York Times.</PodcastDescription>
        </PodcastDetails>
        <PlayButton src={playButton} alt="Play" />
      </PodcastItem>
      <PodcastItem>
        <PodcastImage src={podcast2} alt="Serial" />
        <PodcastDetails>
          <PodcastTitle>Serial</PodcastTitle>
          <PodcastDescription>A groundbreaking series of true crime stories by Sarah Koenig.</PodcastDescription>
        </PodcastDetails>
        <PlayButton src={playButton} alt="Play" />
      </PodcastItem>
      <PodcastItem>
        <PodcastImage src={podcast3} alt="Stuff You Should Know" />
        <PodcastDetails>
          <PodcastTitle>Stuff You Should Know</PodcastTitle>
          <PodcastDescription>Learn about fascinating topics from the hosts of this popular show.</PodcastDescription>
        </PodcastDetails>
        <PlayButton src={playButton} alt="Play" />
      </PodcastItem>
      <PodcastItem>
        <PodcastImage src={podcast4} alt="How I Built This" />
        <PodcastDetails>
          <PodcastTitle>How I Built This</PodcastTitle>
          <PodcastDescription>Stories behind the people who created some of the world’s best-known companies.</PodcastDescription>
        </PodcastDetails>
        <PlayButton src={playButton} alt="Play" />
      </PodcastItem>
      <PodcastItem>
        <PodcastImage src={podcast5} alt="The Joe Rogan Experience" />
        <PodcastDetails>
          <PodcastTitle>The Joe Rogan Experience</PodcastTitle>
          <PodcastDescription>Joe Rogan's long-form conversations with comedians, experts, and celebrities.</PodcastDescription>
        </PodcastDetails>
        <PlayButton src={playButton} alt="Play" />
      </PodcastItem>
    </PodcastsPageContainer>
  );
};

export default PodcastsPage;
