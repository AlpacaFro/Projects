
// Updated Movie Component with Favorite Button
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Movie = () => {
  const { id } = useParams(); // Extract the movie ID from the URL
  const [movie, setMovie] = useState(null); // State to store movie details
  const [genres,setGenres] = useState([]);
  const [prodCompanies,setProdCompanies] = useState([]);

  
  const imgUrl = "https://image.tmdb.org/t/p/w200";
  const TMDB_URL = `https://api.themoviedb.org/3/movie/${id}`;
  const TMDB_KEY = import.meta.env.VITE_TMDB_TOKEN; // Importing the key from .env with Vite syntax
  const detailTitle = "text-yellow-400 text-2xl underline ";


  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(TMDB_URL, {
          headers: {
            Authorization: `Bearer ${TMDB_KEY}`, // Setting the Key
          },
        });
        const data = response.data;
        setMovie(data);
        setGenres(data.genres);
        setProdCompanies(data.production_companies);
      } catch (error) {
        console.error("Error fetching movie details:", error.message);
      }
    };

    fetchMovieDetails();
  }, [id]); 

  const handleFavoriteClick = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(id)) {
      favorites.push(id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert('Movie added to favorites!');
    } else {
      alert('Movie is already in favorites!');
    }
  };

  if (!movie) {
    return <div>Loading...</div>; // Show a loading message until data is fetched
  }

  return (
    <div className="relative flex justify-center items-center h-screen w-screen bg-background mt-14">
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
        <h1 className="text-2xl font-bold text-white tracking-widest pl-10 ">
           <span className="shadow-lg">{movie.title || movie.name}</span>
           - 
           <span className="shadow-lg text-sm pl-0 md:pl-10 md:text-base" >"{movie.tagline}"</span>
        </h1>
        
        <div className="flex gap-6 items-start">
          <img
            src={`${imgUrl}${movie.poster_path}`}
            alt={`${movie.title} poster`}
            className="rounded-xl w-1/3 shadow-lg"
          />
          <div className="flex flex-col">
            <h2 className={detailTitle}>Description </h2>
            <p className="text-gray-300">{movie.overview}</p>
            <h2 className={`${detailTitle} mt-5`}>Genres</h2>

            <div className="flex flex-row">
            {genres.map((genre)=>(
              <p key={genre.id}
              className={`ml-5 mt-5
                 ${genre.id === 28 ? "text-red-700" : ""} 
                 ${genre.id === 12 ? "text-yellow-300" : ""}
                 ${genre.id === 53 ? "text-purple-300" : ""}
                 ${genre.id === 9648 ? "text-purple-600" : ""} 
                 ${genre.id === 80 ? "text-crime" : ""} 
                 ${genre.id === 18 ? "text-drama" : ""} 
                 ${genre.id === 35 ? "text-comedy" : ""} 
                 ${genre.id === 10751 ? "text-family" : ""} 
                 ${genre.id === 14 ? "text-fantasy" : ""} 
                 ${genre.id === 10749 ? "text-romance" : ""} 
                 `}
              >
                {genre.name}
              </p>
            ))}
            </div>

            <div className="pt-5">
            <h2 className={`${detailTitle}`} >Additional info</h2> 
            <p>{movie.status}.</p>
            
            <p
            className={`
              ${movie.vote_average >= 1 && movie.vote_average < 4 ? "text-red-600":""}
              ${movie.vote_average >= 3 && movie.vote_average < 6 ? "text-orange-600":""}
              ${movie.vote_average >= 5 && movie.vote_average < 8 ? "text-rateFive":""}
              ${movie.vote_average >= 7 && movie.vote_average < 9 ? "text-green-600":""}
              ${movie.vote_average >= 9 ? "text-green-300":""}
              `}
            >Rated {movie.vote_average}/10(Total of  {movie.vote_count} votes)</p>
            </div>

            <button
              onClick={handleFavoriteClick}
              className="mt-5 text-white bg-red-600 hover:bg-red-700 font-bold py-2 px-4 my-2 rounded-full"
            >
              ❤️ Add to Favorites
            </button>

            <div className="flex  items-end justify-end absolute right-2 bottom-2 ">
            {prodCompanies.map((company)=>(
             <div className="text-center text-[10px] "  >
             <img src={`${imgUrl}${company.logo_path}`} alt="" className="max-w-[25%] m-auto mb-2" />
             <p>{company.name}, {company.origin_country}</p>
             </div>
            ))}
            </div>

          </div>
          
        </div>
      </section>
    </div>
  );
};

export default Movie;
