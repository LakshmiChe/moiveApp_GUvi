import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMovieDetails } from '../services/omdbApi';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await fetchMovieDetails(id);
      setMovie(data);
    };
    fetchDetails();
  }, [id]);

  return (
    <div className="movie-details">
      <Link to="/" className="back-button">Back to Home</Link>
      {movie ? (
        <>
          <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
          <h1>{movie.Title}</h1>
          <p><strong>Year:</strong> {movie.Year}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MovieDetails;
