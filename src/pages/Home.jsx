import React, { useState } from 'react';
import MovieCard from '../components/MovieCard';
import { fetchMovies } from '../services/omdbApi';

function Home() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('all');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const handleSearch = async (page = 1) => {
    if (query.trim() === '') {
      alert('Please enter a search query!');
      return;
    }
  
    setLoading(true);
    setError('');
    setMovies([]); // Clear previous results when starting a new search
  
    try {
      const results = await fetchMovies(query, type, page);
  
      if (results.Response === 'True') {
        // Filter out movies with no valid image
        const filteredMovies = results.Search.filter(
          (movie) => movie.Poster && movie.Poster !== 'N/A' && movie.Poster !== 'null' && movie.Poster !== ''
        );
        setMovies(filteredMovies); // Set filtered movies for the current page
        setTotalResults(parseInt(results.totalResults, 10));
      } else {
        setMovies([]);
        setError(results.Error);
      }
    } catch (error) {
      setError('Failed to fetch movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  

  const handlePageChange = (page) => {
    setCurrentPage(page);
    handleSearch(page); // Fetch results for the selected page
  };

  // Clear function to reset all states
  const handleClear = () => {
    setQuery('');
    setType('all');
    setMovies([]);
    setLoading(false);
    setError('');
    setCurrentPage(1);
    setTotalResults(0);
  };

  return (
    <div className="home-page">
      <h1>Movie Search</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={() => handleSearch(1)} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="all">All</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
        </select>
        {/* Clear Button */}
        <button onClick={handleClear} disabled={loading || !query}>
          Clear
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>

      {/* Pagination */}
      {totalResults > 10 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || loading}
          >
            Previous
          </button>
          <span>Page {currentPage}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage * 10 >= totalResults || loading}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
