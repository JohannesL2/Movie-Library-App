import './App.css';
import { useMovies } from './hooks/useMovies';
import SearchBar from './components/SearchBar';
import Suggestions from './components/Suggestions';
import MovieDetails from './components/MovieDetails';
import TrendingMovies from './components/TrendingMovies';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Trending from './pages/Trending';

function App() {
  const {
    movie, setMovie,
    suggestions, setSuggestions,
    loading,
    movieDetails, setMovieDetails,
    trendingMovies,
    fetchMovie, fetchTrending
  } = useMovies();

  const handleSearch = () => {
    if (movie) fetchMovie(movie);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <BrowserRouter>
    <div>
      <div className="container text-white p-4">
      <h1 className='Title'>Movie Library</h1>

      <SearchBar movie={movie} setMovie={setMovie} onSearch={handleSearch} onKeyPress={handleKeyPress} />
      <Suggestions suggestions={suggestions} onSelect={(title) => { fetchMovie(title); setSuggestions([]); setMovie("");}} />

      <div className='buttonContainer'>
        <button onClick={handleSearch}>Search Movie</button>
        <button onClick={fetchTrending}>Update what's trending Today</button>
      </div>

      {loading && <p className='loadingText'>Loading...</p>}
      {!loading && movieDetails && <MovieDetails movie={movieDetails} onClose={() => setMovieDetails(null)}/>}
      {trendingMovies.length > 0 && <TrendingMovies movies={trendingMovies} onSelect={fetchMovie} />}
      </div>
    </div>

      <nav className='flex justify-center'>
        <Link className='hover:text-yellow-400' to="/">Home</Link> | {" "}
        <Link className='hover:text-yellow-400' to="/movies">Movies</Link> | {" "}
        <Link className='hover:text-yellow-400' to="/trending">Trending</Link>
      </nav>
    {/* Routes*/}
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/trending' element={<Trending />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
