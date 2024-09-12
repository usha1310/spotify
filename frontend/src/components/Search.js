import React from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  flex: 1;
  background-color: #121212;
  color: white;
  padding: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-radius: 4px;
`;

const Search = () => {
  return (
    <SearchContainer>
      <SearchInput type="text" placeholder="Search for songs, artists, albums..." />
      <p>Search results will appear here</p>
    </SearchContainer>
  );
};

export default Search;
