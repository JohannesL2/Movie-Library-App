import { useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import { useMovies } from '../hooks/useMovies'

export default function Movies() {
    const {
        movie,
        setMovie,
        suggestions,
        fetchMovie,
        trendingMovies,
        fetchTrending,
        movieDetails,
        loading,
    } = useMovies();

    useEffect(() => {
        fetchTrending();
    }, []);

  return (
    <div className='p-8 max-w-3xl mx-auto'>
        <SearchBar
            movie={movie}
            setMovie={setMovie}
            suggestions={suggestions}
            fetchMovie={fetchMovie}
        />

        {movieDetails && (
            <div className='mt-6 bg-white/10 backdrop-blur-md rounded-lg p-4 shadow-md'>
                    <div className='flex flex-col md:flex-row gap-8 items-center md:items-start'>
                    <img src={
                `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
                } 
              alt={movie.title}
              className="w-full md:w-1/3 max-w-1/3 rounded-2xl shadow-lg" />

              {/* Info */}
              <div className='flex-1'>
                    <h2 className='text-3xl font-bold mb-3 text-white'>{movieDetails.title}</h2>
                    <p className='mt-2 text-white'>
                        {movieDetails.overview}
                    </p>

                    <div className='mt-4 text-sm text-zinc-400 space-y-1'>
                        {movieDetails.release_data && (
                            <p>📅<span>Released:</span> {movieDetails.release_date}</p>
                        )}
                        {movieDetails.vote_average && (
                            <p>⭐️<span>Rating:</span> {movieDetails.vote_average.toFixed(1)}/10</p>
                        )}
                        {movieDetails.runtime && (
                            <p>⏱️<span>Runtime:</span> {movieDetails.runtime} min</p>
                        )}
                        {movieDetails.revenue && (
                            <p><span>Revenue:</span> <span>$</span>{movieDetails.revenue.toLocaleString("en-US")}</p>
                        )}
                        {movieDetails.tagline && (
                            <p><span>Tagline:</span> {movieDetails.tagline}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
        )}
    </div>
  )
}
