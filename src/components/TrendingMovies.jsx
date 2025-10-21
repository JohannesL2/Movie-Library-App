import { useEffect, useState } from "react";
import { getTrendingMovies } from "../services/movieService";

function TrendingMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      const data = await getTrendingMovies();
      setMovies(data.results || []);
      setLoading(false);
    };

    fetchTrending();
  }, []);

  if (loading) return <p>Loading trending movies...</p>;

  return (
    <div>
      <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movies.map((movie) => (
          <li 
            key={movie.id}
            className="flex flex-col items-center bg-gray-800 rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform"
          >
            <img 
              src={
                `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                } 
              alt={movie.title}
              className="w-full h-[400px] object-cover"
              />
            
            <div className="p-2 text-center">
              <h3 className="text-lg font-semibold text-white">{movie.title}</h3>
              <p className="text-sm text-gray-400">
                ⭐️ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TrendingMovies;