const API_KEY = 'a3e191fd'; // Replace with your actual OMDB API key
const BASE_URL = 'https://www.omdbapi.com/';

export const fetchMovies = async (query, type, page = 1) => {
    const typeParam = type !== 'all' ? `&type=${type}` : '';
    const pageParam = `&page=${page}`;  // Add the page parameter
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}${typeParam}${pageParam}`);
    return response.json();
  };
  

export const fetchMovieDetails = async (id) => {
  const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}`);
  return response.json();
};
