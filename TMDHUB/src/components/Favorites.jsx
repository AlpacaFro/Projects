import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const imgUrl = 'https://image.tmdb.org/t/p/w200';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const fetchFavorites = () => {
      const favoriteIds = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavorites(favoriteIds);
    };
    fetchFavorites();
  }, []);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {
        if (favorites.length > 0) {
          const apiKey = import.meta.env.VITE_TMDB_TOKEN;
          const movieRequests = favorites.map((id) =>
            axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
              params: {
                api_key: apiKey
              },
              headers: {
                Authorization: `Bearer ${apiKey}`
              }
            })
          );
          const movieResponses = await Promise.all(movieRequests);
          setFavoriteMovies(movieResponses.map((response) => response.data));
        } else {
          setFavoriteMovies([]);
        }
      } catch (error) {
        console.error('Error fetching favorite movies:', error);
      }
    };

    fetchFavoriteMovies();
  }, [favorites]);

  const handleRemoveFavorite = (id) => {
    const updatedFavorites = favorites.filter((favoriteId) => favoriteId !== id);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
    setFavoriteMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
  };

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold text-white text-center'>Favorites</h1>
      {favoriteMovies.length === 0 ? (
        <p className='text-gray-400 mt-4'>No favorite movies yet.</p>
      ) : (
        <ul className='mt-4 flex flex-row flex-wrap '>
          {favoriteMovies.map((movie) => (
            <li key={movie.id} className='text-white p-2 border-b border-gray-700 flex  justify-between items-center ml-20'>
              <Link to={`/movie/${movie.id}`} className='flex  items-center gap-2'>
                <img
                  src={`${imgUrl}${movie.poster_path}`}
                  alt={`${movie.title} poster`}
                  className='w-20 h-30 rounded'
                />
                <div>
                  <h3 className='text-lg'>{movie.title}</h3>
                  <p className='text-sm text-gray-400'>{movie.release_date}</p>
                </div>
              </Link>
              <button
                onClick={() => handleRemoveFavorite(movie.id)}
                className='ml-4 text-white bg-red-600 hover:bg-red-700 font-bold py-2 px-4 rounded-full'
              >
                -
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
