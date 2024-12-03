import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const imgUrl = 'https://image.tmdb.org/t/p/w200'; // Setting default img URL base

// Tailwind constants
const imgStyle = 'rounded-t-lg';
const hover = 'hover:transition-all';

const Movies = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [movieId , setMovieId] = useState(null)//being forwarded to Movie.jsx
  const carouselRef = useRef(null);

  
  useEffect(() => {
    const TMDB_URL = 'https://api.themoviedb.org/3/trending/all/day';
    const TMDB_KEY = import.meta.env.VITE_TMDB_TOKEN; // Importing the key from .env with Vite syntax
    
    const fetchTrending = async () => { //fetching data from api 
      try {
        const response = await axios.get(TMDB_URL, {
          headers: {
            Authorization: `Bearer ${TMDB_KEY}`, // Setting the Key
          },
        });
        setTrendingMovies(response.data.results); 
      } catch (error) {
        console.error(error.message);
      }
    };
    
    fetchTrending();
  }, []); // calls the fetchTrending only one time 
  
  const scrollNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += 800; 
    }
  };

  const scrollPrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft -= 800; 
    }
  };
  
  return (
    <>
      <div className="w-screen  p-5">
        <div className="relative">
          <button
            className=" hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white rounded-full p-2 z-10"
            onClick={scrollPrev}
          >
            &#8592;
          </button>

          <h1 className="text-white text-xl font-bold text-center mb-5">Trending</h1>

          <div
            ref={carouselRef}
            className="flex items-center space-x-5 overflow-x-scroll scrollbar-hide px-5 snap-x snap-mandatory w-full"
            style={{ scrollBehavior: 'smooth' }} >
            {trendingMovies.length > 0 ? ( //if there's movies then..
              trendingMovies.map((movie) => (
               <Link to={`/movie/${movie.id}`} state={{movie}}> {/* linking to movieID*/ }
                <div 
                key={movie.id} 
                className={`w-52 m-5 ${hover} hover:-translate-y-4`}
                onClick={()=>{setMovieId(movie.id)}}
              >
                  <img
                    srcSet={imgUrl + movie.poster_path}
                    alt={movie.title || movie.name}
                    className={`${imgStyle} w-52`}
                  />
                  <div
                    className={`relative bg-gray-900 rounded-b-lg w-52 p-3 drop-shadow-2xl text-white`}
                  >
                    <h3 className="text-start text-sm">{movie.title || movie.name}</h3>
                    <p className="absolute right-2 top-0 text-sm">{movie.media_type}</p>
                    <p className="absolute right-2 top-6 text-sm">{movie.vote_average}</p>
                  </div>
                </div>
                </Link>
              ))
            ) : ( //else Put loading 
              <div className="animate-pulse flex justify-center items-center mx-auto bg-gray-700 rounded-xl h-40 w-full">
                <h1>
                  <span className="text-yellow-600">L</span>oading
                </h1>
              </div>
            )}
          </div>

          <button
            className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white rounded-full p-2 z-10"
            onClick={scrollNext}
          >
            &#8594;
          </button>
        </div>
      </div>
    </>
  );
};

export default Movies;
