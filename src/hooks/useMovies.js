import { useState, useEffect } from "react";
import { searchMovies, getTrendingMovies, getMovieDetails } from "../services/movieService";

export function useMovies() {
    const [movie, setMovie] = useState("");
    const [movieDetails, setMovieDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
      if (movie.length > 2) {
        searchMovies(movie).then(data => {
          setSuggestions(data.results?.slice(0, 5) || []);
        });
      } else {
        setSuggestions([]);
      }
    }, [movie]);

    const fetchMovie = async (title) => {
      setLoading(true);
      try {
      const data = await searchMovies(title);
      if (data.results?.length) {
        const firstMovie = data.results[0];
        const details = await getMovieDetails(firstMovie.id);
        setMovieDetails(details);
      } else {
        setMovieDetails({title: "Movie not found"});
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
      setMovieDetails({ title: "Error fetching movie details "});
    } finally {
      setLoading(false);
    }
  };

    const fetchTrending = async () => {
      setLoading(true);
      const data = await getTrendingMovies();
      setTrendingMovies(data.results || []);
      setLoading(false);
    };

    return {
      movie, setMovie,
      suggestions, setSuggestions,
      loading,
      movieDetails, setMovieDetails,
      trendingMovies, fetchMovie, fetchTrending
    };
}