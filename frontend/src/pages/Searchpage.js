import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import '../css/search.css';
import homeIcon from '../images/home_icon.png';
import styled from 'styled-components';

import telugu from '../images/telugu.jpg';
import hindi from '../images/hindi.jpg';
import tamil from '../images/tamil.jpg';
import marathi from '../images/marathi.jpg';
import punjabi from '../images/punjabi.jpg';
import newreleases from '../images/new releases.jpg';
import chill from '../images/chill.jpg';
import classical from '../images/classical.jpg';
import folk from '../images/folk.jpg';
import hiphop from '../images/hip-hop.jpg';
import kpop from '../images/k-pop.jpg';
import music from '../images/music.jpg';
import devotional from '../images/devotional.jpg';
import workout from '../images/workout.jpg';
import bhojpuri from '../images/bhojpuri.jpg';
import party from '../images/party.jpg';
import radar from '../images/radar.jpeg';
import neon from '../images/neon.jpeg';

const categories = [
  { name: 'Telugu', img: telugu, route: '/telugu' },
  { name: 'Hindi', img: hindi, route: '/hindi' },
  { name: 'Tamil', img: tamil, route: '/tamil' },
  { name: 'Marathi', img: marathi, route: '/marathi' },
  { name: 'New Releases', img: newreleases, route: '/newreleases' },
  { name: 'Music', img: music, route: '/music' },
  { name: 'Punjabi', img: punjabi, route: '/punjabi' },
  { name: 'Chill', img: chill, route: '/chill' },
  { name: 'Classical', img: classical, route: '/classical' },
  { name: 'Folk', img: folk, route: '/folk' },
  { name: 'Hip-Hop', img: hiphop, route: '/hiphop' },
  { name: 'Kpop', img: kpop, route: '/kpop' },
  { name: 'Workout', img: workout, route: '/workout' },
  { name: 'Devotional', img: devotional, route: '/devotional' },
  { name: 'Bhojpuri', img: bhojpuri, route: '/bhojpuri' },
  { name: 'Party', img: party, route: '/party' },
  {name: 'Radar', img: radar, route: '/radar'},
  {name: 'Neon', img: neon, route: '/neon' },
];

const CategoryButton = ({ name, img, route }) => (
  <button className='category-box'>
    <Link to={route} className='text-decoration-none text-dark'>
      <h2>{name}</h2>
      <img src={img} alt={name} className='category-img' />
    </Link>
  </button>
);

const HomeIcon = styled(Link)`
  width: 20px;
  height: -10px;
  margin-right: 2px;
  display: block;
  cursor: pointer;
`;

const Searchpage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Handle search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter categories based on search term
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='box'>
      <div className='d-flex align-items-center'>
        <SearchIcon />
        <input
          className='search bg-dark text-white p-3'
          placeholder="What's the present mood?"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className='h d-flex'>
        <HomeIcon to="/">
          <img src={homeIcon} alt="Home" />
        </HomeIcon>
        <h3 className='p-3 pe-5 ps-5'>BROWSE ALL</h3>
      </div>
      <div className='category'>
        {filteredCategories.map((category, index) => (
          <CategoryButton key={index} {...category} />
        ))}
      </div>
      
    </div>
    
  );
};

export default Searchpage;
