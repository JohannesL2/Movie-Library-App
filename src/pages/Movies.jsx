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
            <div className='mt-6 border rounded-lg p-4 shadow-md'>
                <h2 className='text-xl font-semibold text-zinc-100'>{movieDetails.title}</h2>
                {movieDetails.overview && (
                    <div>
                    <img src={
                `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
                } 
              alt={movie.title}
              className="w-full h-[400px] object-cover" />
                    <p className='mt-2 text-white'>{movieDetails.overview}</p>
                    </div>
                )}
            </div>
        )}
    </div>
  )
}
