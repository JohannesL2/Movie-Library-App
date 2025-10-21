import './App.css';
import { useMovies } from './hooks/useMovies';
import SearchBar from './components/SearchBar';
import Suggestions from './components/Suggestions';
import MovieDetails from './components/MovieDetails';
import TrendingMovies from './components/TrendingMovies';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Trending from './pages/Trending';
import TheMovieDB_Logo from './assets/TMDB_logo.png';

function App() {

  return (
  <div className='bg-zinc-800 text-white max-w-full mx-auto min-h-screen flex flex-col'>
    <BrowserRouter>
    <header className='bg-zinc-900 py-4 shadow-md'>
      <nav className='flex justify-center gap-8'>
        <NavLink
          to="/"
          className={({ isActive }) =>
        isActive
          ? "text-yellow-400 border-b-2 border-yellow-400 pb-1"
          : "text-white hover:text-yellow-400"
        }
      >Home</NavLink>
        <NavLink className={({ isActive }) =>
        isActive
          ? "text-yellow-400 border-b-2 border-yellow-400 pb-1"
          : "text-white hover:text-yellow-400"
        } to="/movies">Movies</NavLink>
        <NavLink className={({ isActive }) =>
        isActive
          ? "text-yellow-400 border-b-2 border-yellow-400 pb-1"
          : "text-white hover:text-yellow-400"
        } to="/trending">Trending</NavLink>
      </nav>
    </header>

    {/* Routes*/}
    <main className='p-4'>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/trending' element={<Trending />} />
      </Routes>
    </main>

    <footer>
          <img 
            src={TheMovieDB_Logo} 
            alt="The Movie Database logo" 
            className='block mx-auto mt-12 mb-4 w-20 opacity-70'
          />
    </footer>
      </BrowserRouter>
    </div>
  );
}
export default App;
