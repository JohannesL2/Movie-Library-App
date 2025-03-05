import { useState } from 'react'
import './App.css'

function App() {
  const [movie, setMovie] = useState("");
  const [movieTitle, setMovieTitle] = useState("");
  const [moviePoster, setMoviePoster] = useState("");
  const [movieDesc, setMovieDesc] = useState("");
  const [movieimdbRating, setMovieimdbRating] = useState("");
  const [loading, setLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [showMovieDetails, setShowMovieDetails] = useState(false);


  const fetchMovie = (movieName) => {
    setLoading(true);
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}`;
    const url = `${apiUrl}&query=${movieName}`;
  

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.results && data.results.length > 0) {
        const firstResult = data.results[0];
        setMovieTitle(firstResult.title);
        setMoviePoster(firstResult.poster_path
          ? `https://image.tmdb.org/t/p/w500${firstResult.poster_path}`
          : ""
        );
        setMovieDesc(firstResult.overview);
        setMovieimdbRating(`IMDb Rating: ${firstResult.vote_average.toFixed(1)}`);
        setShowMovieDetails(true);

        window.scrollTo({top: 0, behavior: "smooth"})
      } else {
        setMovieTitle("Movie not found")
        setShowMovieDetails(true)
      }
      setLoading(false);
    });
  };

  const fetchTrending = () => {
    setLoading(true);
    const trendingUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
    
fetch(trendingUrl)
  .then((response) => response.json())
  .then((data) => {
    if (data.results && data.results.length > 0) {
      setTrendingMovies(data.results);
    }
    setLoading(false);
  })
}


  const handleSearchClick = () => {
    if (movie) {
      fetchMovie(movie);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearchClick();
    }
  }

  return (
    <div>
      <div className="container text-white p-4">
      <h1 className='Title'>Movie Library</h1>
        <input className='w-full movieInput' autoComplete='off' autoFocus="on" type="text" id='movieInput'
        value={movie}
        onChange={(e) => setMovie(e.target.value)}
        onKeyDown={handleKeyPress}
        />
        <div className='buttonContainer'>
        <button id='movieBtn' className='w-full text-black movieBtn' onClick={handleSearchClick}>Search Movie</button>

        <button id='movieTrendingBtn' className='w-full text-black movieTrendingBtn' onClick={fetchTrending}>Update what's trending Today</button>
        </div>

        {loading && <p className='loadingText'>Loading movie...</p>}
        {!loading && showMovieDetails && (<>
        <div className='movieDetails'>
          <button className='closeBtn' onClick={() => setShowMovieDetails(false)}>❌</button>
        <p className='movieTitle'>{movieTitle}</p>
        <div className='movieContainer'>
        <img className='moviePoster' src={moviePoster} alt="" />
        <div className='movieDescContainer'>
        <p className='movieDesc'>{movieDesc}</p>
        {movieimdbRating && <p className='imdbRating'>{movieimdbRating}</p>}
        </div>
        </div>
            </div>
            </>
        )}
        </div>
        <div className='trending-container'>
        <h2>Trending Movies</h2>
          <div className='trending-grid'>
          {trendingMovies.map((movie) => (
            <div key={movie.id} className='trending-movie'
            onClick={() => fetchMovie(movie.title)}
            >
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" 
              className='trending-movie-poster'
              />
              <p className='trending-movie-title'>{movie.title}</p>
              </div>
          ))}
            </div>
        </div>
</div>
  )
}

export default App
