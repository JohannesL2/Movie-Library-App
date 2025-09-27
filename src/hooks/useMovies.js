import { useState, useEffect } from "react";
import { searchMovies, getTrendingMovies } from "../services/movieService";

export function useMovies() {
    const [movie, setMovie] = useState("");
    const [movieDesc, setMovieDesc] = useState("");
    const [loading, setLoading] = useState(false);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [showMovieDetails, setShowMovieDetails] = useState(null);
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
      const data = await searchMovies(title);
      if (data.results?.length) {
        setMovieDesc(data.results[0]);
      } else {
        setMovieDesc({title: "Movie not found"});
      }
      setLoading(false);
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
      movieDesc, setMovieDesc,
      trendingMovies, fetchMovie, fetchTrending
    };
}