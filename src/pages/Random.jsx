import { useEffect, useState } from "react";
import { getRandomMovie } from "../services/movieService";

export default function Random() {
      const [movie, setMovie] = useState([]);
      const [loading, setLoading] = useState(true);
      const [movieId, setMovieId] = useState("");
    
      useEffect(() => {
        const fetchRandom = async () => {
          setLoading(true);
          const randomId = Math.floor(Math.random() * 10000);
          setMovieId(randomId);
          const data = await getRandomMovie(randomId);
          setMovie(data);
          setLoading(false);
        };
    
        fetchRandom();
      }, []);

  return (
        <div>
        <img 
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-[400px] object-cover"
              />
        <p className="italic text-gray-400 tracking-wide">{movie.tagline}</p>
        <p>{movie.title}</p>
        <p className="text-md">{movie.overview}</p>
        <p className="text-gray-500">Movie id: {movieId}</p>
        </div>
    );
}