import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TMDB_KEY = import.meta.env.VITE_TMDB_TOKEN;


const Movies = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const topMovies = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageNum}`;
  const imgUrl = 'https://image.tmdb.org/t/p/w200'; // Setting default img URL base
  
  
  
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(topMovies, {
          headers: {
            Authorization: `Bearer ${TMDB_KEY}`,
          },
        });
        const moviesData = response.data;
        setNowPlaying(moviesData.results); // Set movies to the current page results
        console.log(moviesData);
      } catch (error) {
        console.error("Error fetching movie details:", error.message);
      }
    };
    fetchMovies();
  }, [pageNum]); // Fetch new movies when page number changes



  const handlePreviousPage = () => {
    if (pageNum > 1) {
      setPageNum((prevPageNum) => prevPageNum - 1); 
    }
  };
  const handleNextPage = () => {
    setPageNum((prevPageNum) => prevPageNum + 1); 
  };



  return (
    <div className="w-screen h-screen mt-10 relative">
    {nowPlaying.length > 0 ? (
      <>
      <button onClick={handlePreviousPage} className="absolute left-5 top-10 transform p-2 bg-black text-white rounded">
        &larr;
      </button>
      <h2 className="text-white text-xl font-bold text-center mb-5">Top Movies</h2>
      <button onClick={handleNextPage} className="absolute right-5 top-10 transform p-2 bg-black text-white rounded">
        &rarr;
      </button>
      <div className="grid grid-cols-4 m-auto w-full gap-4 p-10">
        {nowPlaying.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id}>
            <div
              className={`bg-gray-700 p-2 rounded-lg shadow-md text-white cursor-pointer hover:col-span-3 hover:row-span-3 hover:p-4 flex items-end justify-center`}
              style={{
                backgroundImage: movie.backdrop_path
                  ? `url(${imgUrl}${movie.poster_path})`
                  : "#fafafa",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.7,
              }}
            >
              <h3 className="text-center bg-black rounded-lg p-2 ">{movie.title}</h3>
            </div>
          </Link>
        ))}
      </div>
      </>
):(
  <div className="animate-pulse flex justify-center items-center mx-auto bg-gray-700 rounded-xl h-40 w-full">
  <h1>
    <span className="text-yellow-600">L</span>oading
  </h1>
</div>
)}
    </div>
  );
};

export default Movies;
