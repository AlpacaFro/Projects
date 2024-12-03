import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Movie = () => {
  const { id } = useParams(); // Extract the movie ID from the URL
  const [movie, setMovie] = useState(null); // State to store movie details
  const imgUrl = "https://image.tmdb.org/t/p/w200";
  const TMDB_URL = `https://api.themoviedb.org/3/movie/${id}`;
  const TMDB_KEY = import.meta.env.VITE_TMDB_TOKEN; // Importing the key from .env with Vite syntax

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(TMDB_URL, {
          headers: {
            Authorization: `Bearer ${TMDB_KEY}`, // Setting the Key
          },
        });
        setMovie(response.data);
        console.log(movie.production_companies[0].name);
         // Store the movie data
      } catch (error) {
        console.error("Error fetching movie details:", error.message);
      }
    };

    fetchMovieDetails();
  }, [id]); // Re-fetch data whenever the ID changes

  if (!movie) {
    return <div>Loading...</div>; // Show a loading message until data is fetched
  }

  return (
    <div className="relative flex justify-center items-center h-screen w-screen bg-background">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: movie.backdrop_path
            ? `url(${imgUrl}${movie.backdrop_path})`
            : "#fafafa",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(10px)",
          opacity: 0.5,
        }}
      />

      {/* Card Content */}
      <section className="relative z-10 bg-background p-6 rounded-lg shadow-lg w-3/4 flex flex-col gap-6 lg:absolute">
        <h1 className="text-2xl font-bold text-white tracking-widest pl-10">
          {movie.title || movie.name}
        </h1>
        <div className="flex gap-6 items-start">
          <img
            src={`${imgUrl}${movie.poster_path}`}
            alt={`${movie.title} poster`}
            className="rounded-xl w-1/3"
          />
          <div className="flex flex-col">
            <h2 className="text-yellow-400 text-2xl underline">Description</h2>
            <p className="text-gray-300">{movie.overview}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Movie;
