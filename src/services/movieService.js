const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3"

export const searchMovies = async (query) => {
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  return res.json();
};

export const getTrendingMovies = async () => {
  const res = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
  return res.json();
};

export const getMovieDetails = async (movieId) => {
  const res = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
  return res.json();
}

export const getRandomMovie = async (randomId) => {
  const res = await fetch(`${BASE_URL}/movie/${randomId}?api_key=${API_KEY}&language=en-US`)
  return res.json();
}