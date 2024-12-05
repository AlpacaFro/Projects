import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

//tailwind consts
const headerStyle = 'fixed  top-0  w-full  bg-gray-900 h-12 text-white flex items-center  md:px-4 shadow-md z-50 justify-between';
const navContainers = 'flex flex-row gap-2 ';
const buttons = 'block rounded-2xl text-2xl mr-4 p-1 max-h-10 font-semibold  hover:tracking-widest transition-all text-xl';
const dropdownStyle = 'absolute top-11 bg-gray-800 text-white w-full rounded-lg shadow-md max-h-60 overflow-y-auto';
const dropdownItemStyle = 'p-2 hover:bg-gray-700 cursor-pointer';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.length > 0) {
      fetchMovies(searchQuery);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchMovies = async (query) => {
    try {
      const apiKey = import.meta.env.VITE_TMDB_TOKEN; // Importing the key from .env with Vite syntax
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: apiKey,
          query: query
        },
        headers: {
          Authorization: `Bearer ${apiKey}` // Using the Bearer token format
        }
      });
      const data = response.data;
      setSearchResults(data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      console.log('Searching for:', searchQuery);
      e.target.value = "";
    }
  };

  const handleLinkClick = (id) => {
    setSearchResults([]);
    navigate(`/movie/${id}`);
    window.location.reload();
  };

  return (
    <div className={headerStyle}>
      <Link to='/' className='flex flex-row'>
        <img src="/popcorn.svg" className='max-w-10' alt="Popcorn Icon" />
        <p className='text-l md:text-3xl hover:tracking-widest transition-all'>
          TMD<span className='text-yellow-500'>B</span>-HU<span className='text-yellow-500'>B</span>
        </p>
      </Link>
      <div className='relative' ref={dropdownRef}>
        <div className={navContainers}>
          <label htmlFor="search" className='text-3xl'>🔎</label>
          <input
            type="text"
            name="search"
            id="search"
            placeholder='Movie name...'
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyPress}
            className='rounded-2xl bg-blue-950 p-2 w-80'
          />
        </div>
        {searchResults.length > 0 && (
          <div className={dropdownStyle}>
            {searchResults.map((result) => (
              <div key={result.id} className={dropdownItemStyle} onClick={() => handleLinkClick(result.id)}>
                <div className='flex items-center gap-2'>
                  <img 
                    src={`https://image.tmdb.org/t/p/w92${result.poster_path}`} 
                    alt={`${result.title} poster`} 
                    className='w-10 h-15 rounded' 
                  />
                  <span>{result.title}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={navContainers}>
        <Link to='/favorites' className={`text-fuchsia-400 ${buttons}`}>FAVORITES</Link>
        <Link to='/about' className={`text-yellow-500 ${buttons}`}>ABOUT</Link>
      </div>
    </div>
  );
};

export default Header;
