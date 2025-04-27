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
  