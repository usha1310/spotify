import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  width: 100%;
  background-color: #181818;
  color: white;
  text-align: center;
  padding: 20px 0;
  position: fixed;
  bottom: 0;
  left: 0;
  height:100px;
`;
const SectionsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 0 20px;
  box-sizing: border-box;
`;

const Section = styled.div`
  flex: 1;
  
  text-align: center;
`;

const Footer = () => {
  return (
    <FooterContainer >
      <SectionsContainer>
        <Section>
          <h4>Company</h4>
          <p>About Us</p>
          <p>Jobs</p>
        </Section>
        <Section>
          <h4>Communities</h4>
          <p>For Artists</p>
          <p>Developers</p>
         
        </Section>
        <Section>
          <h4>Useful Links</h4>
          <p>Support</p>
          <p>Free Mobile App</p>
        </Section>
        <Section>
          <h4>Spotify Plans</h4>
          <p>Premium Individual</p>
          <p>Premium Duo</p>
          <p>Premium Family</p>
        
        </Section>
        
      </SectionsContainer>
    </FooterContainer>
  );
};

export default Footer;
