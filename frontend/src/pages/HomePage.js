
import React from 'react';
import styled from 'styled-components';

import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import Signup from '../pages/Signup';
import { Route } from 'react-router-dom';
const HomePageContainer = styled.div`
  display: flex;
  background-color:white;
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;

`;

const HomePage = () => {
  return (
    <HomePageContainer>
      
      <ContentContainer>
        <Sidebar />
      
        <MainContent >  </MainContent>
        
      </ContentContainer>
    </HomePageContainer>
  );
};

export default HomePage;
