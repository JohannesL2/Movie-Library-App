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
                <h2 className='text-xl font-semibold'>{movieDetails.title}</h2>
                {movieDetails.overview && (
                    <p className='mt-2 text-gray-700'>{movieDetails.overview}</p>
                )}
            </div>
        )}
    </div>
  )
}
