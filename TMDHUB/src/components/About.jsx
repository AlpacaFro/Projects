import React from 'react';

const About = () => {
  return (
    <div className='p-8'>
      <h1 className='text-4xl font-bold text-white mb-4'>About TMD<span className='text-yellow-500'>B</span>-HU<span className='text-yellow-500'>B</span></h1>
      <p className='text-lg text-gray-300'>TMDB HUB is a platform that provides detailed information about trending movies, including descriptions, ratings, and genres. It also allows users to search for their favorite movies, add them to their favorites list, and explore new releases. Our mission is to make movie discovery fun and easy, giving you all the information you need in one place!</p>
      <p className='text-lg text-gray-300 mt-4'>This app uses The Movie Database (TMDB) API to fetch all the latest movie details and help you stay updated with what's trending in the entertainment world.</p>
      <p className='text-lg text-gray-300 mt-4'>Built with ❤️ by a team of a meleh developer who loves Himself just as much as you do!</p>
    </div>
  );
};

export default About;
